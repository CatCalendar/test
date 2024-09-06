import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../components/Calendar';
import NicknameModal from '../components/NicknameModal';
import '../styles/pages/main.scss';

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
        console.log(
          '사용자 정보가 없습니다. 로그인 페이지로 이동합니다.'
        );
        router.push('/login');
        return;
      }

      try {
        // 토큰과 사용자 ID가 제대로 있는지 확인
        console.log('토큰:', token);
        console.log('사용자 ID:', userId);

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
          { userId }
        );
        const newToken = refreshResponse.data.token;

        localStorage.setItem('token', newToken);
        console.log('새로운 토큰:', newToken);

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
    </div>
  );
};

export default MainPage;
