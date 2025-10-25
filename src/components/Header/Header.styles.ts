import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  cursor: pointer;
  margin: 0;
  transition: color 0.2s;

  &:hover {
    color: #0056b3;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
`;

export const NavLink = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: ${(props) => (props.$active ? '600' : '400')};
  color: ${(props) => (props.$active ? '#007bff' : '#666')};
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: #007bff;
  }

  ${(props) =>
    props.$active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #007bff;
    }
  `}
`;

export const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const LogoutButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #545b62;
  }
`;
