import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db'; // db 모듈 경로가 정확한지 확인
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';

interface User extends RowDataPacket {
  id: number;
  nickname: string;
  kakao_nickname: string;
  kakao_image: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json(
      { message: '유저 ID가 없습니다.' },
      { status: 400 }
    );
  }

  // Authorization 헤더에서 토큰 가져오기
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: '토큰이 제공되지 않았습니다.' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    // JWT 검증
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );
    const decodedUserId = (decoded as { userId: number })
      .userId;

    // 요청한 userId와 토큰에 포함된 userId가 일치하는지 확인
    if (Number(userId) !== decodedUserId) {
      return NextResponse.json(
        { message: '잘못된 사용자 요청입니다.' },
        { status: 403 }
      );
    }

    // DB에서 사용자 정보 조회
    const [users] = await db.query<User[]>(
      'SELECT id, nickname, kakao_nickname, kakao_image FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 사용자 정보 반환
    const user = users[0];
    return NextResponse.json(user);
  } catch (error) {
    console.error('JWT 검증 오류:', error);
    return NextResponse.json(
      { message: '인증 실패: 잘못된 토큰' },
      { status: 401 }
    );
  }
}
