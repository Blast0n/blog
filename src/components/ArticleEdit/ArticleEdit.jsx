import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

import Article from '../Article/Article';
import { putPost } from '../../store/appSlice';

export default function ArticleEdit() {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const { singlePostData } = useSelector((state) => state.app);

  const onSubmit = async (data) => {
    data.tagList = data.tagList.filter((el) => el.value).map((el) => el.value);
    const obj = {
      article: data,
      slug: singlePostData.slug,
    };
    dispatch(putPost(obj));
    setSuccess(true);
  };
  if (success) {
    return <Navigate to={`/${singlePostData.slug}`} />;
  }
  return <Article title="Edit article" singlePostData={singlePostData} onSubmit={onSubmit} />;
}
