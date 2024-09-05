import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginRedirectPage: React.FC = () => {
  const router = useRouter();
  const [isRequestSent, setIsRequestSent] = useState(false); // 요청이 이미 보내졌는지 추적

  useEffect(() => {
    const handleLoginRedirect = async () => {
      if (isRequestSent) return; // 요청이 이미 보내졌다면 더 이상 실행하지 않음

      const code = new URLSearchParams(
        window.location.search
      ).get('code');

      if (code) {
        try {
          setIsRequestSent(true); // 요청을 보내기 전에 상태 변경
          const response = await axios.get(
            `/api/user/kakaoLogin?code=${code}`,
            {
              withCredentials: true,
            }
          );

          const { token, userId } = response.data;

          // 토큰과 사용자 ID를 로컬 스토리지에 저장
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId.toString());

          console.log(
            '로그인 성공: userId:',
            userId,
            'token:',
            token
          );
          console.log('메인 페이지로 이동합니다.');

          // 로그인 성공 시 메인 페이지로 리다이렉트
          router.push('/main');
        } catch (error) {
          console.error('로그인 처리 중 오류 발생:', error);
          router.push('/login');
        }
      } else {
        console.error('카카오 인증 코드가 없습니다.');
        router.push('/login');
      }
    };

    handleLoginRedirect();
  }, [router, isRequestSent]); // isRequestSent를 의존성에 추가하여 요청이 중복 실행되지 않도록 함

  return <div>로그인 처리 중...</div>;
};

export default LoginRedirectPage;
