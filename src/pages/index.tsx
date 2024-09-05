import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      router.push('/main'); // userId가 있으면 메인 페이지로 이동
    } else {
      router.push('/login'); // userId가 없으면 로그인 페이지로 이동
    }
  }, [router]);

  return <div>로딩중...</div>; // 리다이렉트 전 "로딩중..." 메시지 표시
};

export default IndexPage;
