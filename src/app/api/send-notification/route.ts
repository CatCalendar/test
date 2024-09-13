import type { NextApiRequest, NextApiResponse } from 'next';
import { messaging } from '../../../utils/firebase-admin-config'; // Firebase Admin SDK 초기화 파일 가져오기

// API 요청 처리
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      token,
      title,
      body,
    }: { token: string; title: string; body: string } =
      req.body;

    // FCM 메시지 구성
    const message = {
      notification: {
        title: title || '기본 제목',
        body: body || '기본 메시지 내용',
      },
      token: token, // 클라이언트의 FCM 토큰
    };

    try {
      // 메시지 전송
      const response = await messaging.send(message);
      console.log('Successfully sent message:', response);
      res.status(200).json({
        success: true,
        message: 'Notification sent!',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send notification',
        error,
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
