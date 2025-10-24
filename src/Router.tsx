import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostList from './pages/PostList';
import GlobalStyle from './styles/GlobalStyle';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<PostList />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
