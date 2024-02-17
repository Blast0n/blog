/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import uuid from 'react-uuid';
import { Spin, Popconfirm } from 'antd';

import { getPost, deletePost, getPosts, postFavorite } from '../../store/appSlice';

import style from './SinglePost.module.scss';

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singlePostData, loading, user, currentPage } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(id));
  }, []);
  const tags = singlePostData.tagList?.map((el) => {
    let shortTag = el;
    if (el.length > 15) {
      shortTag = el.slice(0, 15).concat('...');
    }
    if (el.trim().length === 0) {
      return null;
    }
    return (
      <span className={style.header__tags} key={uuid()} title={el.trim()}>
        {shortTag.trim()}
      </span>
    );
  });
  const handleFavorite = () => {
    dispatch(postFavorite({ id, method: singlePostData.favorited ? 'DELETE' : 'POST' }));
  };

  const handleDelete = async () => {
    dispatch(deletePost(id))
      .then(() => dispatch(getPosts(currentPage)))
      .then(() => navigate('/'));
  };
  return (
    <div className={style.post}>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: 'auto auto' }} />
      ) : (
        <>
          <div className={style.post__header}>
            <div className={style.header__content}>
              <div className={style.header__title}>
                <h2>{singlePostData.title}</h2>
                <button className={style.header__favorite} type="button" onClick={handleFavorite}>
                  <img
                    src={singlePostData.favorited ? './src/assets/redfav.svg' : './src/assets/Vector.svg'}
                    height="14"
                    width="14"
                    alt=""
                  />
                </button>
                <span className={style.header__likes}>{singlePostData.favoritesCount}</span>
              </div>
              <div>{tags}</div>
              <div className={style.header__text}>{singlePostData.description}</div>
            </div>
            <div className={style.header__info}>
              <div className={style.header__user}>
                <div className={style.user__name}>{singlePostData?.author?.username}</div>
                <div className={style.user__date}>
                  {singlePostData.createdAt && format(singlePostData.createdAt, 'PP')}
                </div>
              </div>
              <div className={style.header__avatar}>
                <img src={singlePostData?.author?.image} alt="" width={46} height={46} />
              </div>
              {singlePostData?.author?.username === user.username && (
                <div className={style.header__btns}>
                  <Popconfirm
                    description="Are you sure to delete this article?"
                    placement="bottom"
                    onConfirm={() => handleDelete()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button type="button" className={style.header__delete}>
                      Delete
                    </button>
                  </Popconfirm>

                  <Link to="edit" className={style.header__edit}>
                    Edit
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Markdown className={style.post__content}>{singlePostData.body}</Markdown>
        </>
      )}
    </div>
  );
}
