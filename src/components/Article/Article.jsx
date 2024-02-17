/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, useFieldArray } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import style from './Article.module.scss';

export default function Article({ title, onSubmit, singlePostData }) {
  let defaultValues = { tagList: [{ value: '' }] };
  if (singlePostData) {
    if (Object.keys(singlePostData).length) {
      const arr = singlePostData.tagList.map((el) => {
        return { value: el };
      });
      defaultValues = {
        title: singlePostData.title,
        description: singlePostData.description,
        body: singlePostData.body,
        tagList: arr,
      };
    } else {
      return <Navigate to="/" />;
    }
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  const canAddField = () => {
    const values = watch('tagList');
    return values.length === 0 || values[values.length - 1].value !== '';
  };

  return (
    <div className={style.article}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{title}</h2>
        <div>
          <label>
            Title
            <input
              className={style.article__input}
              type="text"
              placeholder="Title"
              {...register('title', {
                required: 'Title field is required.',
                maxLength: {
                  value: 200,
                  message: 'Title cannot be more than 200 characters',
                },
              })}
            />
          </label>
          {errors?.title && <span className={style.article__error}>{errors.title.message}</span>}
        </div>
        <div style={{ marginTop: 10 }}>
          <label>
            Short description
            <input
              className={style.article__input}
              type="text"
              placeholder="Description"
              {...register('description', {
                required: 'Description field is required.',
                maxLength: {
                  value: 1200,
                  message: 'Description cannot be more than 1200 characters',
                },
              })}
            />
          </label>
          {errors?.description && <span className={style.article__error}>{errors.description.message}</span>}
        </div>
        <div style={{ marginTop: 20 }}>
          <label>
            Text
            <textarea
              className={`${style.article__input} ${style['article__input--big']}`}
              type="text"
              placeholder="Text"
              {...register('body', {
                required: 'Text field is required.',
              })}
            />
          </label>
          {errors?.body && <span className={style.article__error}>{errors.body.message}</span>}
        </div>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <label>
            Tags
            {fields.map((field, index) => (
              <div key={field.id} className={style.article__tag}>
                <input
                  className={`${style.article__input} ${style['article__input--small']}`}
                  type="text"
                  placeholder="Tag"
                  {...register(`tagList.${index}.value`)}
                />
                <button type="button" className={style['article__btn-dlt']} onClick={() => remove(index)}>
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              className={style['article__btn-add']}
              onClick={() => canAddField() && append({ value: '' })}
            >
              Add tag
            </button>
          </label>
        </div>
        <input className={style.article__submit} type="submit" value="Send" />
      </form>
    </div>
  );
}
