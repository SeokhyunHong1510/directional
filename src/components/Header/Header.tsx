import React from 'react';
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
  const isLoggedIn = !!localStorage.getItem('auth_token');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
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
          onClick={() => navigate('/posts')}
          active={location.pathname === '/' || location.pathname === '/posts'}
        >
          Posts
        </NavLink>
        {isLoggedIn && (
          <NavLink
            onClick={() => navigate('/mypage')}
            active={location.pathname === '/mypage'}
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
