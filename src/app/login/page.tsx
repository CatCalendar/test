import React from 'react';
import '../../styles/pages/loginPage.scss'; // CSS 모듈 사용 // CSS 모듈 사용으로 변경 (권장)

const LoginPage: React.FC = () => {
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
