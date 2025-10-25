import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  HeaderContainer,
  Logo,
  Nav,
  NavLink,
  AuthSection,
  Button,
  LogoutButton,
} from './Header.styles';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('auth_token'),
  );

  // location이나 로그인 상태 변경 감지
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('auth_token'));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false); // UI 즉시 업데이트
    navigate('/'); // 로그아웃 시 항상 메인으로 이동
  };

  // Don't show header on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>Directional Board</Logo>
      <Nav>
        <NavLink
          onClick={() => navigate('/')}
          $active={location.pathname === '/' || location.pathname === '/charts'}
        >
          Charts
        </NavLink>
        <NavLink
          onClick={() => navigate('/posts')}
          $active={location.pathname === '/posts'}
        >
          Posts
        </NavLink>
        {isLoggedIn && (
          <NavLink
            onClick={() => navigate('/mypage')}
            $active={location.pathname === '/mypage'}
          >
            My Page
          </NavLink>
        )}
      </Nav>
      <AuthSection>
        {isLoggedIn ? (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        ) : (
          <Button onClick={() => navigate('/login')}>Login</Button>
        )}
      </AuthSection>
    </HeaderContainer>
  );
};

export default Header;
