// pages/api/fcm.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendFCMNotification } from '../../../../firebase/admin-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // 서버에서 푸시 알림 전송
      const result = await sendFCMNotification(message);
      res.status(200).json({ result });
    } catch (error) {
      console.error('푸시 알림 전송 실패:', error);
      res
        .status(500)
        .json({ error: '푸시 알림 전송 중 오류 발생' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
