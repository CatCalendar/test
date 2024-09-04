import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginRedirectPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const code = new URLSearchParams(
        window.location.search
      ).get('code');
      console.log('코드는 있음:', code);
      if (code) {
        console.log('카카오 인증 코드:', code);
        axios
          .get(`/api/user/kakaoLogin?code=${code}`, {
            withCredentials: true,
          })
          .then((response) => {
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem(
              'userId',
              userId.toString()
            );
            router.push('/main');
          })
          .catch((error) => {
            console.error(
              '로그인 처리 중 오류 발생:',
              error
            );
            router.push('/');
          });
      } else {
        console.error('카카오 인증 코드가 없습니다.');
        router.push('/'); // 인증 코드가 없으면 로그인 페이지로 이동
      }
    }
  }, [router]);

  return <div>로그인 처리 중...</div>;
};

export default LoginRedirectPage;
