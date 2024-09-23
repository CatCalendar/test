'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  messaging,
  getToken,
} from '../../../firebase/firebase-config';

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

          // FCM 토큰 요청
          const fcmToken = await getToken(messaging);
          if (fcmToken) {
            // FCM 토큰을 서버로 전송
            const fcmResponse = await axios.post(
              '/api/save-token',
              {
                token: fcmToken,
                userId: userId,
              }
            );

            // FCM 토큰을 로컬 스토리지에 저장
            localStorage.setItem(
              'fcmToken',
              fcmResponse.data.token
            );
            console.log(
              'FCM 토큰이 로컬 스토리지에 저장되었습니다.'
            );
          } else {
            console.warn('FCM 토큰을 가져올 수 없습니다.');
          }

          router.push('/main');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // AxiosError인 경우
            console.error(
              'Axios error 발생:',
              error.response?.data || error.message || error
            );
          } else {
            // 그 외 일반 오류 처리
            console.error('일반적인 오류 발생:', error);
          }
        }
      } else if (!code) {
        console.warn('카카오 인증 코드가 없습니다.');
      }
    };

    if (!isHandlingLogin) {
      handleLoginRedirect(); // 상태 변화에 따라 한 번만 실행되도록 제어
    }
  }, [isHandlingLogin, router]);

  return <div>로그인 처리 중...</div>;
};

export default LoginRedirectPage;
