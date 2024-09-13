// firebase-messaging-sw.js
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js'
);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // 알림에 사용할 아이콘 경로
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
