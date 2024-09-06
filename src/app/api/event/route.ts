import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db'; // 데이터베이스 모듈
import { OkPacket } from 'mysql2';
import { RowDataPacket } from 'mysql2';
// 이벤트 인터페이스 정의
interface Event extends RowDataPacket {
  id: number;
  user_id: number;
  title: string;
  details: string;
  date: string;
  time: string;
}

// GET 요청으로 사용자 이벤트 목록을 조회하는 API
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json(
      { message: '유저 ID를 제공해주세요.' },
      { status: 400 }
    );
  }

  // 2. Authorization 헤더에서 토큰 가져오기
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: '토큰이 제공되지 않았습니다.' },
      { status: 401 }
    );
  }

  try {
    // 이벤트 조회 쿼리 실행
    const [events] = await db.query<Event[]>(
      'SELECT id, user_id, title, details, date, time FROM event WHERE user_id = ? ORDER BY date, time',
      [userId]
    );

    if (events.length === 0) {
      return NextResponse.json(
        { message: '이벤트가 없습니다.' },
        { status: 404 }
      );
    }

    // 조회된 이벤트 목록 반환
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('이벤트 목록 조회 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.', error },
      { status: 500 }
    );
  }
}

// POST 요청으로 이벤트를 생성하는 API
export async function POST(request: NextRequest) {
  try {
    const { user_id, title, details, date, time } =
      await request.json(); // 요청에서 데이터 추출

    // 필수 데이터가 모두 있는지 확인
    if (!user_id || !title || !date || !time) {
      return NextResponse.json(
        { message: '필수 정보를 모두 제공해주세요.' },
        { status: 400 }
      );
    }

    // 2. Authorization 헤더에서 토큰 가져오기
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: '토큰이 제공되지 않았습니다.' },
        { status: 401 }
      );
    }

    // 이벤트 삽입 쿼리 실행
    const [result] = await db.query<OkPacket>(
      'INSERT INTO event (user_id, title, details, date, time) VALUES (?, ?, ?, ?, ?)',
      [user_id, title, details, date, time]
    );

    // 성공적으로 삽입되었는지 확인
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: '이벤트 생성에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: '이벤트가 성공적으로 생성되었습니다.',
        eventId: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('이벤트 생성 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.', error },
      { status: 500 }
    );
  }
}
