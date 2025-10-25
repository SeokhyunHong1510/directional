import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 80px auto 40px;
  padding: 0 20px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  background: ${({ active }) => (active ? '#4a90e2' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#666')};
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) => (active ? '#4a90e2' : '#f5f5f5')};
    color: ${({ active }) => (active ? '#fff' : '#333')};
  }
`;

export const ChartContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

export const ChartTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const ChartWrapper = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: 20px;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #e74c3c;
`;
