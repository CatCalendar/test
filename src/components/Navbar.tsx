import {
  faCalendar,
  faCircleUser,
  faGear,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import Link from 'next/link'; // Next.js의 Link 컴포넌트 사용
import { useRouter } from 'next/router'; // Next.js의 useRouter 훅 사용
import '../styles/components/Navbar.scss'; // 기존 SCSS 파일 그대로 사용

const Navbar: React.FC = () => {
  const router = useRouter(); // 현재 경로를 가져오기 위해 useRouter 사용

  // 사용할 경로를 배열로 정의
  const allowedPaths: string[] = [
    '/main',
    '/user',
    '/setting',
    '/alllist',
  ];

  // 현재 경로가 allowedPaths에 포함되지 않으면 null 반환
  if (!allowedPaths.includes(router.pathname)) {
    return null;
  }

  return (
    <div className="nav_bar">
      <div className="nav_bar_content">
        {/* ProfilePage */}
        <div>
          <Link href="/user" passHref legacyBehavior>
            <a
              className={
                router.pathname === '/user'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              <FontAwesomeIcon icon={faCircleUser} />
            </a>
          </Link>
        </div>
        {/* MainPage */}
        <div>
          <Link href="/main" passHref legacyBehavior>
            <a
              className={
                router.pathname === '/main'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              <FontAwesomeIcon icon={faCalendar} />
            </a>
          </Link>
        </div>
        {/* SettingPage */}
        <div>
          <Link href="/alllist" passHref legacyBehavior>
            <a
              className={
                router.pathname === '/alllist'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              <FontAwesomeIcon icon={faList} />
            </a>
          </Link>
        </div>
        <div>
          <Link href="/setting" passHref legacyBehavior>
            <a
              className={
                router.pathname === '/setting'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              <FontAwesomeIcon icon={faGear} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
