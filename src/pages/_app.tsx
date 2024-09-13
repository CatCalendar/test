import '../styles/global.scss'; // 글로벌 스타일 가져오기
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Navbar from '../components/Navbar'; // Navbar 컴포넌트 가져오기
import { messaging } from '../../firebase/firebase-config.js'; // Firebase 설정 파일에서 messaging 가져오기
import { MessagePayload } from 'firebase/messaging';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log(
            'Firebase Service Worker registered:',
            registration
          );
          messaging.useServiceWorker(registration);
        })
        .catch((err) => {
          console.log(
            'Service Worker registration failed:',
            err
          );
        });

      // FCM 구독 및 토큰 발급
      const requestPermission = async () => {
        try {
          const permission =
            await Notification.requestPermission();
          if (permission === 'granted') {
            const token = await messaging.getToken();
            console.log('FCM Token:', token);

            // 서버로 토큰을 전송
            await fetch('/api/save-token', {
              method: 'POST',
              body: JSON.stringify({ token }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } else {
            console.warn('Notification permission denied');
          }
        } catch (error) {
          console.error(
            'Error getting permission or token:',
            error
          );
        }
      };

      // 토큰 갱신 처리
      messaging.onTokenRefresh(async () => {
        try {
          const newToken = await messaging.getToken();
          console.log('New FCM Token:', newToken);

          // 새로운 토큰을 서버로 전송
          await fetch('/api/save-token', {
            method: 'POST',
            body: JSON.stringify({ token: newToken }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error(
            'Error retrieving new token:',
            error
          );
        }
      });

      // 알림 수신 처리
      messaging.onMessage((payload: MessagePayload) => {
        console.log('Message received: ', payload);

        // 필요한 경우 알림 UI를 표시하거나 처리 로직 추가
      });

      requestPermission();
    }
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
