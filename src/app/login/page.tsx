'use client';

import React from 'react';
import '../../styles/pages/loginPage.scss'; // CSS 모듈 사용
import Image from 'next/image';

// 서버에서 이 페이지를 프리렌더링하지 않도록 설정
export const dynamic = 'force-dynamic';

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
        onClick={handleLogin}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default LoginPage;
