import * as admin from 'firebase-admin';
import * as serviceAccount from '../../firebase/push-notification-6a4d8-firebase-adminsdk-vsb36-049a34011c.json'; // 서비스 계정 JSON 파일

// Firebase Admin SDK 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      serviceAccount as admin.ServiceAccount
    ), // 타입 적용
  });
}

export const messaging = admin.messaging();
