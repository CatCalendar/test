import { NextResponse } from 'next/server'; // Next.js의 Edge API에서 사용하는 Response 객체
import db from '../../../lib/db'; // DB 연결 설정

// POST 요청에 대한 처리
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, userId } = body;

    if (!token || !userId) {
      return NextResponse.json(
        { error: 'FCM token and user ID are required' },
        { status: 400 }
      );
    }

    // FCM 토큰을 user 테이블에 저장하는 쿼리
    const query =
      'UPDATE users SET fcm_token = ? WHERE id = ?';
    await db.query(query, [token, userId]);

    return NextResponse.json({
      message: 'FCM token saved successfully',
      token,
    });
  } catch (error) {
    console.error('Error saving FCM token:', error);
    return NextResponse.json(
      { error: 'Database error occurred' },
      { status: 500 }
    );
  }
}
