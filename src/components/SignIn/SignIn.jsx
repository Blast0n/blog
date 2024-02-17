/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postLogin } from '../../store/appSlice';

import style from './SignIn.module.scss';

export default function SignIn() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const answer = await dispatch(postLogin(data)).then((el) => el.payload);
    if (answer.message) {
      setError('root', {
        message: answer.message,
      });
    }
  };

  if (isLogged) {
    return <Navigate to="/" />;
  }
  return (
    <div className={style.signin}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
        <div>
          <label>
            Email address
            <input
              className={style.signin__input}
              type="mail"
              placeholder="Email address"
              {...register('Email', {
                required: 'Email field is required.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
            />
          </label>
          {errors?.Email && <span className={style.signin__error}>{errors.Email.message}</span>}
        </div>
        <div>
          <label>
            Password
            <input
              className={style.signin__input}
              type="password"
              placeholder="Password"
              {...register('Password', {
                required: 'Password field is required.',
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters.',
                },
              })}
            />
          </label>
          {errors?.Password && <span className={style.signin__error}>{errors.Password.message}</span>}
        </div>
        {errors.root && <span className={style.signin__error}>{errors.root.message}</span>}
        <input className={style.signin__submit} type="submit" value="Login" />
      </form>
      <div className={style.signin__redirect}>
        Don’t have an account?{' '}
        <Link to="/sign-up" className={style.signin__link}>
          Sign Up.
        </Link>
      </div>
    </div>
  );
}
