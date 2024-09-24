// src/app/not-found.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// 동적 페이지에 적용
export const dynamic = 'force-dynamic';

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const goHome = () => {
    router.push('/'); // 홈으로 리다이렉트
  };

  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <button
        onClick={goHome}
        style={{ padding: '10px', marginTop: '20px' }}
      >
        홈으로 가기
      </button>
    </div>
  );
};

export default NotFoundPage;
