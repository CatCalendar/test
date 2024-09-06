import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginRedirectPage: React.FC = () => {
  const router = useRouter();
  const [isHandlingLogin, setIsHandlingLogin] =
    useState(false); // 로그인 처리가 한 번만 실행되도록 상태 추가

  useEffect(() => {
    const handleLoginRedirect = async () => {
      const code = new URLSearchParams(
        window.location.search
      ).get('code');

      if (code && !isHandlingLogin) {
        setIsHandlingLogin(true); // 로그인 처리 중으로 상태 설정
        console.log('카카오 인증 코드:', code);

        try {
          const response = await axios.get(
            `/api/user/kakaoLogin?code=${code}`,
            {
              withCredentials: true,
            }
          );

          const { token, userId } = response.data;

          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId.toString());

          // 로그인 성공 시 메인 페이지로 리다이렉트
          console.log('로그인 성공 야호!');
          router.push('/main');
        } catch (error) {}
      } else if (!code) {
      }
    };

    if (!isHandlingLogin) {
      handleLoginRedirect(); // 상태 변화에 따라 한 번만 실행되도록 제어
    }
  }, [isHandlingLogin, router]);

  return <div>로그인 처리 중...</div>;
};

export default LoginRedirectPage;
