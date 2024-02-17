import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { postNewPsot } from '../../store/appSlice';
import Article from '../Article/Article';

export default function ArticleCreate() {
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    data.tagList = data.tagList.filter((el) => el.value).map((el) => el.value);
    dispatch(postNewPsot(data)).then((answ) => navigate(`/${answ.payload.article.slug}`));
  };
  if (!isLogged) {
    return <Navigate to="/sign-in" />;
  }

  return <Article title="Create new article" onSubmit={onSubmit} />;
}
