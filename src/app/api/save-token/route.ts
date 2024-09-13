// pages/api/save-token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';
// API 핸들러 함수
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ error: 'FCM token is required' });
    }

    try {
      // 데이터베이스에 토큰을 저장하는 쿼리
      const query =
        'INSERT INTO user_tokens (token) VALUES (?)';
      await db.query(query, [token]);

      return res
        .status(200)
        .json({ message: 'FCM token saved successfully' });
    } catch (error) {
      console.error('Error saving token:', error);
      return res
        .status(500)
        .json({ error: 'Database error occurred' });
    }
  } else {
    return res
      .status(405)
      .json({ error: 'Method not allowed' });
  }
}
