import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter 훅 사용
import Image from 'next/image'; // Next.js의 이미지 최적화 기능
import '../styles/pages/loginPage.scss'; // CSS 모듈 사용 // CSS 모듈 사용으로 변경 (권장)

const LoginPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // userId가 존재하면 메인 페이지로 리디렉션
      router.push('/main');
    }
  }, [router]);

  const handleLogin = () => {
    const clientId =
      process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri =
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="login-page">
      <img
        onClick={handleLogin}
        className="login-button"
        src="/kakao_login.png"
        alt="카카오 로그인"
        width={200} // 적절한 이미지 크기 설정
        height={50}
      />
    </div>
  );
};

export default LoginPage;
