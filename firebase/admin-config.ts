// firebase/admin-config.ts
import admin, { ServiceAccount } from 'firebase-admin';

// 서비스 계정 키 설정
const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  privateKey:
    process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!.replace(
      /\\n/g,
      '\n'
    ),
  clientEmail:
    process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
};

// Firebase Admin SDK 초기화 (서버 전용)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// API 호출 시 전달할 데이터 타입
interface NotificationData {
  token: string;
  title: string;
  body: string;
  image?: string;
  click_action?: string;
}

// 푸시 알림 전송 함수 (서버에서 호출)
export const sendFCMNotification = async (
  data: NotificationData
): Promise<string> => {
  // 메시지 객체를 명시적으로 타입 정의
  const message: admin.messaging.Message = {
    notification: {
      title: data.title,
      body: data.body,
    },
    token: data.token,
    webpush: {
      notification: {
        image: data.image, // 웹 푸시 알림에 이미지 추가
      },
      fcmOptions: {
        link: data.click_action, // 클릭 시 이동할 링크 설정
      },
    },
  };

  try {
    // 푸시 알림 전송 및 응답 타입을 string으로 지정
    const response: string = await admin
      .messaging()
      .send(message);
    console.log('푸시 알림 전송 성공:', response);
    return response;
  } catch (error) {
    console.error('푸시 알림 전송 중 오류 발생:', error);
    throw new Error('푸시 알림 전송 실패');
  }
};
