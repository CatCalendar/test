'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../components/Calendar';
import NicknameModal from '../../components/NicknameModal';
import '../../styles/pages/main.scss';
import {
  messaging,
  getToken,
  onMessage,
} from '../../../firebase/firebase-config';
import NotificationModal from '../../components/NotificationModal'; // 모달 컴포넌트 가져오기

interface User {
  id: number;
  nickname: string;
  kakao_image: string | null;
}

const MainPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        router.push('/login');
        return;
      }

      try {
        // 사용자 정보 요청
        const userInfoResponse = await axios.get(
          `/api/user/info?user_id=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userInfoResponse.data);

        // 닉네임이 없으면 모달창 열기
        if (!userInfoResponse.data.nickname) {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error(
          '사용자 정보를 가져오는 중 오류 발생:',
          error
        );

        try {
          // 오류가 발생하면 토큰을 재발급하고 다시 요청
          const refreshResponse = await axios.post(
            '/api/user/refreshToken',
            {
              userId,
            }
          );
          const newToken = refreshResponse.data.token;

          localStorage.setItem('token', newToken);
          console.log('새 토큰이 발급 받기!');
          console.log('새 토큰:', newToken);

          // 새 토큰으로 사용자 정보 다시 요청
          const retryResponse = await axios.get(
            `/api/user/info?user_id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          setUser(retryResponse.data);

          if (!retryResponse.data.nickname) {
            setIsModalOpen(true);
          }
        } catch (refreshError) {
          console.error(
            '토큰 재발급 중 오류 발생:',
            refreshError
          );
          // 필요 시 추가적인 오류 처리 로직
        }
      } finally {
        checkNotificationPermission(); // 알림 권한 확인
        setLoading(false);
      }
    };

    const checkNotificationPermission = async () => {
      const storedPermission = localStorage.getItem(
        'notificationPermission'
      );
      if (
        Notification.permission === 'default' &&
        !storedPermission
      ) {
        // 권한 요청 전 상태면 모달을 표시
        setModalVisible(true);
      } else if (
        Notification.permission === 'granted' &&
        !storedPermission
      ) {
        console.log(
          'Notification permission already granted.'
        );
        localStorage.setItem(
          'notificationPermission',
          'granted'
        ); // 로컬 스토리지에 저장
        requestFcmToken(); // 권한이 허용된 경우 FCM 토큰 요청
      } else if (Notification.permission === 'denied') {
        console.warn('Notification permission denied.');
        localStorage.setItem(
          'notificationPermission',
          'denied'
        ); // 로컬 스토리지에 저장
      }
    };

    const requestFcmToken = async () => {
      try {
        const fcmToken = await getToken(messaging);
        const storedFcmToken =
          localStorage.getItem('fcmToken');

        if (fcmToken && fcmToken !== storedFcmToken) {
          // FCM 토큰이 변경되었거나 저장된 토큰과 다르면 서버로 전송
          const fcmResponse = await axios.post(
            '/api/save-token',
            {
              token: fcmToken,
              userId: localStorage.getItem('userId'),
            }
          );

          // FCM 토큰을 로컬 스토리지에 저장
          localStorage.setItem(
            'fcmToken',
            fcmResponse.data.token
          );
          console.log(
            'FCM 토큰이 로컬 스토리지에 저장되었습니다.'
          );
        } else {
          console.warn('FCM 토큰을 가져올 수 없습니다.');
        }
      } catch (fcmError) {
        console.error(
          'FCM 토큰 요청 중 오류 발생:',
          fcmError
        );
      }
    };

    fetchData();
  }, [router]);

  const requestFcmToken = async () => {
    try {
      const fcmToken = await getToken(messaging);
      const storedFcmToken =
        localStorage.getItem('fcmToken');

      if (fcmToken && fcmToken !== storedFcmToken) {
        // FCM 토큰이 변경되었거나 저장된 토큰과 다르면 서버로 전송
        const fcmResponse = await axios.post(
          '/api/save-token',
          {
            token: fcmToken,
            userId: localStorage.getItem('userId'),
          }
        );

        // FCM 토큰을 로컬 스토리지에 저장
        localStorage.setItem(
          'fcmToken',
          fcmResponse.data.token
        );
        console.log(
          'FCM 토큰이 로컬 스토리지에 저장되었습니다.'
        );
      } else {
        console.warn('FCM 토큰을 가져올 수 없습니다.');
      }
    } catch (fcmError) {
      console.error(
        'FCM 토큰 요청 중 오류 발생:',
        fcmError
      );
    }
  };

  // 알림 권한 요청 함수
  const requestNotificationPermission = async () => {
    const permission =
      await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      localStorage.setItem(
        'notificationPermission',
        'granted'
      ); // 로컬 스토리지에 저장
      requestFcmToken(); // 권한 허용 시 FCM 토큰 요청
    } else if (permission === 'denied') {
      console.warn('Notification permission denied.');
      localStorage.setItem(
        'notificationPermission',
        'denied'
      ); // 로컬 스토리지에 저장
    }
  };

  const handleNicknameSubmitSuccess = (
    nickname: string
  ) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, nickname } : null
    ); // 닉네임 업데이트
    setIsModalOpen(false); // 모달 닫기
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAllowNotifications = () => {
    requestNotificationPermission();
    setModalVisible(false); // 모달창 닫기
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="main-page">
      <div className="main-header">
        {user ? (
          <>
            <p>{user.nickname}의 일정</p>
            <span>
              {user.kakao_image ? (
                <img
                  src={user.kakao_image}
                  alt="User"
                  className="user-image"
                />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </span>
          </>
        ) : (
          <p>유저 정보를 불러오는 중...</p>
        )}
      </div>
      <Calendar />

      {/* 닉네임 설정 모달 */}
      {isModalOpen && user && (
        <NicknameModal
          userId={user.id.toString()}
          token={localStorage.getItem('token')!}
          onSubmitSuccess={handleNicknameSubmitSuccess}
          onClose={handleModalClose}
        />
      )}

      {/* 알림 권한 요청 모달창 */}
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAllow={handleAllowNotifications}
      />
    </div>
  );
};

export default MainPage;
