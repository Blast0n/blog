import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import Post from '../Post/Post';
import { getPosts, onPageChange } from '../../store/appSlice';

import style from './Postslist.module.scss';

export default function Postslist() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const { data, totalPosts, currentPage } = useSelector((state) => state.app);

  useEffect(() => {
    const arrPosts = data.map((el) => {
      return (
        <Post
          key={el.slug}
          id={el.slug}
          title={el.title}
          tagList={el.tagList}
          description={el.description}
          favoritesCount={el.favoritesCount}
          author={el.author}
          time={el.createdAt}
          favorited={el.favorited}
        />
      );
    });
    setPosts(arrPosts);
  }, [data]);

  const onChange = (page) => {
    dispatch(onPageChange(page));
    dispatch(getPosts(page));
  };

  return (
    <>
      <ul className={style['blog-list']}>{posts}</ul>
      <Pagination
        current={currentPage}
        onChange={onChange}
        total={totalPosts - 5}
        pageSize={5}
        showSizeChanger={false}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      />
    </>
  );
}
