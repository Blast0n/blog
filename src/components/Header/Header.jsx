import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getPosts, onLogout } from '../../store/appSlice';

import style from './Header.module.scss';

export default function Header() {
  const dispatch = useDispatch();
  const { user, isLogged, currentPage } = useSelector((state) => state.app);
  return (
    <header className={style.header}>
      <div className={style.header__title}>
        <Link to="/" onClick={() => dispatch(getPosts(currentPage))}>
          Realworld Blog
        </Link>
      </div>
      {isLogged ? (
        <div>
          <Link to="/new-article" className={style.header__create}>
            Create article
          </Link>
          <Link to="/profile" className={style.header__user}>
            <span>{user.username}</span>
            <img
              src={user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              alt=""
              width={46}
              height={46}
            />
          </Link>
          <Link to="/" className={style['header__log-out']} onClick={() => dispatch(onLogout())}>
            Log Out
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/sign-in" className={style['header__sign-in']}>
            Sign In
          </Link>
          <Link to="/sign-up" className={style['header__sign-up']}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
