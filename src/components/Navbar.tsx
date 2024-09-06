import {
  faCalendar,
  faCircleUser,
  faGear,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter 훅 사용
import '../styles/components/Navbar.scss'; // 기존 SCSS 파일 그대로 사용

const Navbar: React.FC = () => {
  const router = useRouter(); // 현재 경로를 가져오기 위해 useRouter 사용

  // 사용할 경로를 배열로 정의
  const allowedPaths: string[] = [
    '/main',
    '/userInfo',
    '/settings',
    '/allList',
  ];

  // 현재 경로가 allowedPaths에 포함되지 않으면 null 반환
  if (!allowedPaths.includes(router.pathname)) {
    return null;
  }

  // 페이지 이동 함수 정의
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="nav_bar">
      <div className="nav_bar_content">
        {/* ProfilePage */}
        <div
          className="nav_bar_icon"
          onClick={() => handleNavigation('/userInfo')}
        >
          <FontAwesomeIcon
            icon={faCircleUser}
            className={
              router.pathname === '/userInfo'
                ? 'nav-link active'
                : 'nav-link'
            }
          />
        </div>
        {/* MainPage */}
        <div
          className="nav_bar_icon"
          onClick={() => handleNavigation('/main')}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className={
              router.pathname === '/main'
                ? 'nav-link active'
                : 'nav-link'
            }
          />
        </div>
        {/* SettingPage */}
        <div
          className="nav_bar_icon"
          onClick={() => handleNavigation('/allList')}
        >
          <FontAwesomeIcon
            icon={faList}
            className={
              router.pathname === '/allList'
                ? 'nav-link active'
                : 'nav-link'
            }
          />
        </div>
        <div
          className="nav_bar_icon"
          onClick={() => handleNavigation('/settings')}
        >
          <FontAwesomeIcon
            icon={faGear}
            className={
              router.pathname === '/settings'
                ? 'nav-link active'
                : 'nav-link'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
