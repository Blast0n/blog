/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postUser } from '../../store/appSlice';

import style from './SignUp.module.scss';

export default function SignUp() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const answer = await dispatch(postUser(data));
    if (answer.payload.message) {
      setError('root', {
        message: answer.payload.message,
      });
    }
  };

  if (isLogged) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className={style.signup}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new account</h2>
        <div className={style.user}>
          <label>
            Username
            <input
              className={style.signup__input}
              type="text"
              placeholder="Username"
              {...register('Username', {
                required: 'Username field is required.',
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
                maxLength: {
                  value: 20,
                  message: 'Username cannot be more than 20 characters',
                },
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
              })}
            />
          </label>
          {errors?.Username && <span className={style.signup__error}>{errors.Username.message}</span>}
        </div>
        <div>
          <label>
            Email address
            <input
              className={style.signup__input}
              type="mail"
              placeholder="Email address"
              {...register('Email', {
                required: 'Password field is required.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
            />
          </label>
          {errors?.Email && <span className={style.signup__error}>Use a valid email address.</span>}
        </div>
        <div>
          <label>
            Password
            <input
              className={style.signup__input}
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
          {errors?.Password && <span className={style.signup__error}>{errors.Password.message}</span>}
        </div>
        <div>
          <label>
            Repeat Password
            <input
              className={style.signup__input}
              type="password"
              placeholder="Password"
              {...register('RepeatPass', {
                required: 'Password field is required.',
                validate: (value) => value === watch('Password') || 'The passwords must match.',
              })}
            />
          </label>
          {errors?.RepeatPass && <span className={style.signup__error}>{errors?.RepeatPass.message}</span>}
        </div>
        <div className={style.signup__line} />
        <div className={style.signup__terms}>
          <label>
            <input
              type="checkbox"
              {...register('agree', {
                required: 'You must agree to the terms',
              })}
            />
            <p>I agree to the processing of my personal information</p>
          </label>
          {errors?.agree && <span className={style.signup__error}>{errors?.agree.message}</span>}
        </div>
        {errors.root && <span className={style.signup__error}>{errors.root.message}</span>}
        <input className={style.signup__submit} type="submit" value="Create" />
      </form>
      <div className={style.signup__redirect}>
        Already have an account?{' '}
        <Link to="/sign-in" className={style.signup__link}>
          Sign In.
        </Link>
      </div>
    </div>
  );
}
