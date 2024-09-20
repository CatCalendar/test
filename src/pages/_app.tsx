import '../styles/global.scss'; // 글로벌 스타일 가져오기
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Navbar from '../components/Navbar'; // Navbar 컴포넌트 가져오기
import {
  messaging,
  onMessage,
} from '../../firebase/firebase-config'; // FCM 설정 파일에서 가져오기
import { MessagePayload } from 'firebase/messaging';
import NotificationModal from '../components/NotificationModal'; // 모달 컴포넌트 가져오기

function MyApp({ Component, pageProps }: AppProps) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 알림 권한 상태 확인
    const checkNotificationPermission = () => {
      const storedPermission = localStorage.getItem(
        'notificationPermission'
      );

      if (
        Notification.permission === 'default' &&
        !storedPermission
      ) {
        // 권한 요청 전 상태면 모달을 표시
        setModalVisible(true);
      } else if (
        Notification.permission === 'granted' &&
        !storedPermission
      ) {
        console.log(
          'Notification permission already granted.'
        );
        localStorage.setItem(
          'notificationPermission',
          'granted'
        ); // 로컬 스토리지에 저장
      } else if (Notification.permission === 'denied') {
        console.warn('Notification permission denied.');
        localStorage.setItem(
          'notificationPermission',
          'denied'
        ); // 로컬 스토리지에 저장
      }
    };

    checkNotificationPermission();

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
                  '/cat_calendar_192x192.png',
              }
            );
          }
        });
      }
    };

    handleMessage();
  }, []);

  // 알림 권한 요청 함수
  const requestNotificationPermission = async () => {
    const permission =
      await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      localStorage.setItem(
        'notificationPermission',
        'granted'
      ); // 로컬 스토리지에 저장
    } else if (permission === 'denied') {
      console.warn('Notification permission denied.');
      localStorage.setItem(
        'notificationPermission',
        'denied'
      ); // 로컬 스토리지에 저장
    } else {
      console.log('Notification permission dismissed.');
    }
  };

  // 모달창에서 "허용" 버튼 클릭 시 실행되는 함수
  const handleAllowNotifications = () => {
    requestNotificationPermission();
    setModalVisible(false); // 모달창 닫기
  };

  return (
    <Provider store={store}>
      <div className="wrap">
        <div className="is_nav">
          {/* 모든 페이지에 전역 상태 및 레이아웃 적용 */}
          <Component {...pageProps} />
        </div>
        <Navbar />

        {/* 알림 권한 요청 모달창 */}
        <NotificationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAllow={handleAllowNotifications}
        />
      </div>
    </Provider>
  );
}

export default MyApp;
