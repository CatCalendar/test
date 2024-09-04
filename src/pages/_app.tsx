import '../styles/global.scss'; // 글로벌 스타일 가져오기
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Navbar from '../components/Navbar'; // Navbar 컴포넌트 가져오기
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 클라이언트 사이드에서만 실행
      const storedId = localStorage.getItem('userId');
      if (storedId) {
        setUserId(storedId);
      } else {
        console.error('사용자 정보가 없습니다.');
      }
    }
  }, []);

  // userId가 설정된 후에만 Component를 렌더링하도록 변경
  return (
    <Provider store={store}>
      <div className="wrap">
        <div className="is_nav">
          {/* 모든 페이지에서 userId를 사용할 수 있도록 props로 전달 */}
          {userId !== null && (
            <Component {...pageProps} userId={userId} />
          )}
        </div>
        <Navbar />
      </div>
    </Provider>
  );
}

export default MyApp;
