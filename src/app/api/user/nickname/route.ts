import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db'; // DB 연결
import { OkPacket } from 'mysql2';

// 닉네임 설정 API
export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json(); // 요청에서 userId 가져오기
    const { nickname } = await request.json(); // 요청에서 nickname 가져오기

    // 닉네임과 유저 ID가 있는지 확인
    if (!userId || !nickname) {
      return NextResponse.json(
        { message: '유저 ID와 닉네임을 제공해주세요.' },
        { status: 400 }
      );
    }

    // 닉네임 업데이트 쿼리 실행
    const [result] = await db.query<OkPacket>(
      'UPDATE users SET nickname = ? WHERE id = ?',
      [nickname, userId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: '유저를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: '유저가 성공적으로 업데이트되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('닉네임 업데이트 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.', error },
      { status: 500 }
    );
  }
}
