import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { OkPacket, RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
  id: number;
  kakao_nickname: string;
  kakao_image: string;
  nickname?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { message: '인가 코드가 없습니다.' },
      { status: 400 }
    );
  }

  try {
    // 카카오 토큰 요청
    const tokenResponse = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID!,
        redirect_uri: process.env.KAKAO_REDIRECT_URI!,
        code: code as string,
      }),
      {
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = tokenResponse.data;
    const userResponse = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const kakaoNickname =
      userResponse.data.kakao_account.profile.nickname;
    const kakaoImage =
      userResponse.data.kakao_account.profile
        .profile_image_url;

    console.log('유저 정보:', kakaoNickname, kakaoImage);

    // 기존 사용자 찾기
    const [existingUsers] = await db.query<User[]>(
      'SELECT * FROM users WHERE kakao_nickname = ? AND kakao_image = ?',
      [kakaoNickname, kakaoImage]
    );

    let userId: number;
    if (existingUsers.length > 0) {
      const user = existingUsers[0];
      userId = user.id;
    } else {
      // 새로운 사용자 추가
      const [result] = await db.query<OkPacket>(
        'INSERT INTO users (kakao_nickname, kakao_image) VALUES (?, ?)',
        [kakaoNickname, kakaoImage]
      );
      userId = result.insertId;
    }

    // JWT 생성
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    console.log('JWT 생성:', token);
    // 클라이언트에 토큰 전달
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Kakao OAuth2.0 Error:', error);
    return NextResponse.json(
      { message: 'Kakao OAuth2.0 Error' },
      { status: 500 }
    );
  }
}
