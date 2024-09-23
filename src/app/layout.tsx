// src/app/layout.tsx
import '../styles/global.scss'; // 글로벌 스타일 가져오기
import { ReactNode } from 'react';
import Navbar from '../components/Navbar'; // Navbar 컴포넌트 가져오기// 알림 처리 컴포넌트

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="wrap">
          <div className="is_nav">
            {children} {/* 페이지별 내용이 여기 렌더링 */}
          </div>
          <Navbar /> {/* 공통 네비게이션 */}
        </div>
      </body>
    </html>
  );
}
