import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../components/Calendar';
import NicknameModal from '../components/NicknameModal';
import '../styles/pages/main.scss';
import { messaging } from '../../firebase/firebase-config';

interface User {
  id: number;
  nickname: string;
  kakao_image: string | null;
}

const MainPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

        // 오류가 발생하면 토큰을 재발급하고 다시 요청
        const refreshResponse = await axios.post(
          '/api/user/refreshToken',
          {
            userId,
          }
        );
        const newToken = refreshResponse.data.token;

        localStorage.setItem('token', newToken);

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
      } finally {
        // FCM 토큰 요청
        const fcmToken = await messaging.getToken();
        const storedFcmToken =
          localStorage.getItem('fcmToken');

        if (fcmToken && fcmToken !== storedFcmToken) {
          // FCM 토큰이 변경되었거나 저장된 토큰과 다르면 서버로 전송
          const fcmResponse = await axios.post(
            '/api/save-token',
            {
              token: fcmToken,
              userId: userId,
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
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

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
    </div>
  );
};

export default MainPage;
