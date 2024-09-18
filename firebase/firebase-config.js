// firebase-config.js
import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Firebase 초기화가 한 번만 실행되도록 보호
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 이미 초기화된 앱을 사용
}

const messaging = firebase.messaging();

export { messaging };
