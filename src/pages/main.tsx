import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../components/Calendar';
import '../styles/pages/main.scss';
interface User {
  id: number;
  nickname: string;
  kakao_image: string | null;
}

const MainPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // User 타입 정의
  const [token, setToken] = useState<string | null>(null); // 토큰을 상태로 관리
  const router = useRouter();
  const [oneTime, setOneTime] = useState(true);
  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      router.push('/login');
      return;
    }
    if (oneTime) {
      axios
        .post('/api/user/refreshToken', { userId })
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem('token', token);
          setToken(token); // 새로운 토큰을 상태에 저장
          setOneTime(false);
        })
        .catch((error) => {
          console.error('토큰 재발급 중 오류 발생:', error);
          router.push('/login');
        });
    }
  }, []);

  // 토큰이 설정되었을 때 사용자 정보를 요청
  useEffect(() => {
    if (token && !oneTime) {
      const userId = localStorage.getItem('userId');

      axios
        .get(`/api/user/info?user_id=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(
            '사용자 정보를 가져오는 중 오류 발생:',
            error
          );
          router.push('/login');
        });
    }
  }, [token, router]); // 토큰이 변경될 때만 실행되도록 설정

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
    </div>
  );
};

export default MainPage;
