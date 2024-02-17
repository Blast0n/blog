/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { putUser } from '../../store/appSlice';

import style from './Profile.module.scss';

export default function Profile() {
  const dispath = useDispatch();
  const { isLogged } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    if (!data.image) {
      delete data.image;
    }
    const answer = await dispath(putUser(data)).then((el) => el.payload);
    if (answer.message) {
      setError('root', {
        message: answer.message,
      });
    } else {
      reset();
    }
  };

  if (!isLogged) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <div className={style.profile}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit Profile</h2>
        <div>
          <label>
            Username
            <input
              className={style.profile__input}
              type="text"
              placeholder="Username"
              {...register('username', {
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
          {errors?.username && <span className={style.profile__error}>{errors.username.message}</span>}
        </div>
        <div>
          <label>
            Email address
            <input
              className={style.profile__input}
              type="mail"
              placeholder="Email address"
              {...register('email', {
                required: 'Password field is required.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
            />
          </label>
          {errors?.email && <span className={style.profile__error}>{errors.email.message}.</span>}
        </div>
        <div>
          <label>
            New password
            <input
              className={style.profile__input}
              type="password"
              placeholder="New password"
              {...register('password', {
                required: 'Password field is required.',
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters.',
                },
              })}
            />
          </label>
          {errors?.password && <span className={style.profile__error}>{errors.password.message}</span>}
        </div>
        <div>
          <label>
            Avatar image (url)
            <input
              className={style.profile__input}
              type="url"
              placeholder="Avatar image"
              {...register('image', {
                pattern: {
                  value: /^https:\/\/.*$/,
                  message: 'Invalid URL',
                },
              })}
            />
          </label>
          {errors?.image && <span className={style.profile__error}>{errors.image.message}</span>}
        </div>
        {errors.root && <span className={style.profile__error}>{errors.root.message}</span>}
        <input className={style.profile__submit} type="submit" value="Save" />
      </form>
    </div>
  );
}
