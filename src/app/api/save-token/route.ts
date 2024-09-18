// pages/api/save-token.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // lib/db에서 db 객체 가져오기
import { ResultSetHeader } from 'mysql2'; // ResultSetHeader 타입 가져오기

// FCM 토큰을 users 테이블에 저장/업데이트하는 함수
const saveTokenToDatabase = async (
  userId: string,
  fcmToken: string
) => {
  try {
    // users 테이블에 해당 사용자의 FCM 토큰이 이미 존재하면 업데이트, 없으면 새로 저장
    const [result] = await db.query<ResultSetHeader>(
      `UPDATE users SET fcm_token = ? WHERE id = ?`,
      [fcmToken, userId]
    );

    // affectedRows는 ResultSetHeader에 있음
    if (result.affectedRows === 0) {
      await db.query(
        `INSERT INTO users (id, fcm_token) VALUES (?, ?)`,
        [userId, fcmToken]
      );
    }
  } catch (error) {
    console.error(
      'Error saving FCM token to database:',
      error
    );
    throw new Error('FCM 토큰 저장 중 오류 발생');
  }
};

// API 핸들러
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { token: fcmToken, userId } = req.body;

    if (!fcmToken || !userId) {
      return res
        .status(400)
        .json({ error: 'FCM 토큰과 userId는 필수입니다.' });
    }

    try {
      // FCM 토큰을 데이터베이스에 저장/업데이트
      await saveTokenToDatabase(userId, fcmToken);
      return res.status(200).json({
        message: 'FCM 토큰이 저장되었습니다.',
        token: fcmToken,
      });
    } catch (error) {
      // error.message가 존재하지 않는 경우에도 안전하게 처리
      return res
        .status(500)
        .json({
          error:
            error instanceof Error
              ? error.message
              : String(error),
        });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
