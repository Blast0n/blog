import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getPosts, getUser } from './store/appSlice';
import './App.module.scss';
import Postslist from './components/Postslist/Postslist';
import Layout from './components/Layout/Layout';
import SinglePost from './components/SinglePost/SinglePost';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import ArticleCreate from './components/ArticleCreate/ArticleCreate';
import ArticleEdit from './components/ArticleEdit/ArticleEdit';

function App() {
  const dispatch = useDispatch();
  const { currentPage, isLogged } = useSelector((state) => state.app);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUser(token)).then(() => dispatch(getPosts(currentPage)));
    } else {
      dispatch(getPosts(1));
    }
  }, [isLogged]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Postslist />} />
        <Route path=":id" element={<SinglePost />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="profile" element={<Profile />} />
        <Route path="new-article" element={<ArticleCreate />} />
        <Route path=":id/edit" element={<ArticleEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
