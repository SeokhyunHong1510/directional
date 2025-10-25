import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  AuthSection,
  Button,
  HeaderContainer,
  Logo,
  LogoutButton,
  Nav,
  NavLink,
} from './Header.styles';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('auth_token'),
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('auth_token'));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    navigate('/');
  };

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
