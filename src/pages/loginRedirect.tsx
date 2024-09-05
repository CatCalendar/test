import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginRedirectPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    console.log('로그인 처리 중...');
    const handleLoginRedirect = async () => {
      const code = new URLSearchParams(
        window.location.search
      ).get('code');
      console.log('인증 코드:', code);

      if (code) {
        try {
          // 카카오 인증 코드로 로그인 처리
          const response = await axios.get(
            `/api/user/kakaoLogin?code=${code}`,
            {
              withCredentials: true,
            }
          );

          console.log('API 응답:', response.data); // 응답 데이터 확인

          const { token, userId } = response.data;

          // 토큰과 사용자 ID를 로컬 스토리지에 저장
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId.toString());

          // 로그인 성공 시 메인 페이지로 리다이렉트
          router.push('/main');
        } catch (error) {
          console.error('로그인 처리 중 오류 발생:', error);

          // 로그인 실패 시 로그인 페이지로 리다이렉트
          router.push('/login');
        }
      } else {
        console.error('카카오 인증 코드가 없습니다.');

        // 인증 코드가 없으면 로그인 페이지로 이동
        router.push('/login');
      }
    };

    handleLoginRedirect(); // 비동기 함수 호출
  }, [router]);

  return <div>로그인 처리 중...</div>;
};

export default LoginRedirectPage;
