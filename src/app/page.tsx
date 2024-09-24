'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// 동적 페이지에 적용
export const dynamic = 'force-dynamic';

const IndexPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // 브라우저 환경에서만 localStorage에 접근
    if (typeof window !== 'undefined') {
      const storedId = localStorage.getItem('userId');
      if (storedId) {
        router.push('/main'); // userId가 있으면 메인 페이지로 이동
      } else {
        router.push('/login'); // userId가 없으면 로그인 페이지로 이동
      }
    }
    setLoading(false); // 로딩 완료 상태로 변경
  }, [router]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중 메시지
  }

  return null; // 리다이렉트 되기 때문에 실제로 렌더링할 내용 없음
};

export default IndexPage;
