/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import uuid from 'react-uuid';
import { Spin } from 'antd';

import { postFavorite } from '../../store/appSlice';

import style from './Post.module.scss';

export default function Post({ id, title, tagList, description, favoritesCount, author, time, favorited }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isLogged } = useSelector((state) => state.app);
  let newTitle = <Link to={`/${id}`}>{title}</Link>;
  if (title.length > 45) {
    newTitle = (
      <Link to={`/${id}`} title={title}>
        {title.slice(0, 45).concat('...')}
      </Link>
    );
  }
  const tags = tagList.map((el) => {
    let shortTag = el;
    if (el.length > 15) {
      shortTag = el.slice(0, 15).concat('...');
    }
    if (el.trim().length === 0) {
      return null;
    }
    return (
      <span key={uuid()} title={el.trim()}>
        {shortTag.trim()}
      </span>
    );
  });
  if (description?.length > 500) {
    description = description.slice(0, 500).concat('...');
  }
  const handleFavorite = () => {
    if (isLogged) {
      dispatch(postFavorite({ id, method: favorited ? 'DELETE' : 'POST' }));
    } else {
      navigate('/sign-in');
    }
  };
  return (
    <li className={style['blog-list__item']}>
      {loading ? (
        <Spin size="large" style={{ margin: 'auto auto' }} />
      ) : (
        <>
          <div className={style['item-content']}>
            <div className={style['item-title']}>
              {newTitle}
              <button type="button" className={style['item-btn']} onClick={handleFavorite}>
                <img
                  src={favorited ? './src/assets/redfav.svg' : './src/assets/Vector.svg'}
                  height="14"
                  width="14"
                  alt=""
                />
              </button>
              <span className={style['item-title__likes']}>{favoritesCount}</span>
            </div>
            <div className={style['item-tag']}>{tags?.slice(0, 7)}</div>
            <div className={style['item-text']}>{description}</div>
          </div>
          <div className={style['item-info']}>
            <div className={style['item-user']}>
              <div className={style['item-user__name']}>{author.username}</div>
              <div className={style['item-user__date']}>{format(time, 'PP')}</div>
            </div>
            <img className={style['item-avatar']} src={author.image} alt="" width={46} height={46} />
          </div>
        </>
      )}
    </li>
  );
}
