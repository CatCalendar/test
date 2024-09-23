'use client';

import React from 'react';
import '../../styles/pages/loginPage.scss'; // CSS 모듈 사용
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    const clientId =
      process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri =
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error('환경변수가 설정되지 않았습니다.');
      return;
    }

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="login-page">
      <Image
        src="/kakao_login.png"
        alt="카카오 로그인"
        width={200}
        height={50}
      />
    </div>
  );
};

export default LoginPage;
