import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import PostList from './pages/PostList';
import GlobalStyle from './styles/GlobalStyle';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
