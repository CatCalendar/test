import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken as getFcmToken,
  onMessage,
  Messaging,
} from 'firebase/messaging'; // onMessage 추가

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// messaging 초기화
let messaging: Messaging | null = null;
if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}

// getToken을 래핑하여 가져오는 함수 생성
const getToken = (messaging: Messaging | null) => {
  if (!messaging) return null;
  return getFcmToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  });
};

export { messaging, getToken, onMessage }; // onMessage 추가
