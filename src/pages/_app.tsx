// pages/_app.tsx

import '../styles/global.scss'; // 글로벌 스타일 가져오기
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Navbar from '../components/Navbar'; // Navbar 컴포넌트 가져오기
import {
  messaging,
  onMessage,
} from '../../firebase/firebase-config'; // FCM 설정 파일에서 가져오기
import { MessagePayload } from 'firebase/messaging';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 서비스 워커 등록 함수
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration =
            await navigator.serviceWorker.register(
              '/firebase-messaging-sw.js'
            );
          console.log(
            'Firebase Service Worker registered:',
            registration
          );
        } catch (err) {
          console.error(
            'Service Worker registration failed:',
            err
          );
        }
      }
    };

    // 알림 권한 요청 함수
    const requestNotificationPermission = async () => {
      const permission =
        await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else if (permission === 'denied') {
        console.warn('Notification permission denied.');
      } else {
        console.log('Notification permission dismissed.');
      }
    };

    // 메시지 수신 처리 함수
    const handleMessage = () => {
      if (messaging) {
        onMessage(messaging, (payload: MessagePayload) => {
          console.log(
            'Foreground message received: ',
            payload
          );
          // 알림을 사용자에게 표시하거나 필요한 로직을 추가
          if (payload.notification) {
            new Notification(
              payload.notification.title || '알림 제목',
              {
                body:
                  payload.notification.body || '알림 내용',
                icon:
                  payload.notification.icon ||
                  '/path/to/icon.png',
              }
            );
          }
        });
      }
    };

    // useEffect 내에서 함수 호출
    registerServiceWorker();
    requestNotificationPermission(); // 알림 권한 요청
    handleMessage();
  }, []);

  return (
    <Provider store={store}>
      <div className="wrap">
        <div className="is_nav">
          {/* 모든 페이지에 전역 상태 및 레이아웃 적용 */}
          <Component {...pageProps} />
        </div>
        <Navbar />
      </div>
    </Provider>
  );
}

export default MyApp;
