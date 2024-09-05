import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar'; // Calendar 컴포넌트 경로가 올바른지 확인
import '../styles/pages/main.scss'; // CSS 모듈로 변경
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface User {
  id: number;
  nickname: string;
  kakao_image: string;
}

const MainPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // localStorage 접근은 클라이언트 사이드에서만 실행
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      // userId나 token이 없으면 로그인 페이지로 리디렉션
      router.push('/login');
      return;
    }

    // API 요청 헤더에 토큰을 추가하여 사용자 정보 가져오기
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
        // 오류가 발생하면 로그인 페이지로 리디렉션
        router.push('/login');
      });
  }, [router]);

  return (
    <div className="main-page">
      <div className="main-header">
        {user ? (
          <>
            {/*로그인 시 나오는 닉네임*/}
            <p>{user.nickname}의 일정</p>
            {/*유저가 설정한 이미지*/}
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
