import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginRedirectPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLoginRedirect = async () => {
      const code = new URLSearchParams(
        window.location.search
      ).get('code');

      if (code) {
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
        } catch (error) {
          console.error('로그인 처리 중 오류 발생:', error);
        }
      } else {
        console.error('카카오 인증 코드가 없습니다.');
        router.push('/login');
      }
    };

    handleLoginRedirect();
  }, [router]);

  return <div>로그인 처리 중...</div>;
};

export default LoginRedirectPage;
