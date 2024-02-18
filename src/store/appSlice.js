// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getData,
  getSinglePostData,
  postCreateNewUser,
  postDoLogin,
  getUserData,
  putUpdateUser,
  postNewArticle,
  putNewPost,
  deleteArticle,
  favoritesHandler,
} from '../api';

export const getPosts = createAsyncThunk('blog/getPosts', async (page, { rejectWithValue, getState }) => {
  const state = getState();
  const { token } = state.app.user;
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  try {
    const data = await getData(page, headers);
    if (data === '404') {
      throw new Error('Server error');
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getPost = createAsyncThunk('blog/getPost', async (id, { rejectWithValue, getState }) => {
  const state = getState();
  const { token } = state.app.user;
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  try {
    const data = await getSinglePostData(id, headers);
    if (data === '404') {
      throw new Error('Server error');
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postUser = createAsyncThunk('blog/postUser', async (obj, { rejectWithValue }) => {
  try {
    const data = await postCreateNewUser(obj);
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

export const postLogin = createAsyncThunk('blog/postLogin', async (obj, { rejectWithValue }) => {
  try {
    const data = await postDoLogin(obj);
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

export const getUser = createAsyncThunk('blog/getUser', async (token, { rejectWithValue }) => {
  console.log(token);
  try {
    const data = await getUserData(token);
    if (data === 'error') {
      throw new Error('Server error');
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const putUser = createAsyncThunk('blog/putUser', async (obj, { rejectWithValue, getState }) => {
  const state = getState();
  const { token } = state.app.user;
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  try {
    const user = { user: obj };
    const data = await putUpdateUser(user, headers);
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

export const postNewPsot = createAsyncThunk('blog/postNewPsot', async (obj, { rejectWithValue, getState }) => {
  const state = getState();
  const { token } = state.app.user;
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  try {
    const data = await postNewArticle(obj, headers);
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

export const putPost = createAsyncThunk('blog/putPost', async (obj, { rejectWithValue, getState }) => {
  const state = getState();
  const { token } = state.app.user;
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  try {
    const data = await putNewPost(obj, headers);
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

export const deletePost = createAsyncThunk('blog/deletePost', async (id, { rejectWithValue, getState }) => {
  const state = getState();
  const { token } = state.app.user;
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  try {
    const data = await deleteArticle(id, headers);
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

export const postFavorite = createAsyncThunk(
  'blog/postFavorite',
  async ({ id, method }, { rejectWithValue, getState }) => {
    const state = getState();
    const { token } = state.app.user;
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Token ${token}`;
    }
    try {
      const data = await favoritesHandler(id, method, headers);
      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const appSlice = createSlice({
  name: 'blog',
  initialState: {
    data: [],
    singlePostData: {},
    user: {},
    currentPage: 1,
    loading: false,
    totalPosts: 0,
    isLogged: false,
  },
  reducers: {
    onPageChange(state, action) {
      state.currentPage = action.payload;
    },
    onLogout(state) {
      state.isLogged = false;
      state.user = {};
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...action.payload.articles];
        state.totalPosts = action.payload.articlesCount;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePostData = action.payload.article;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })
      .addCase(postUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        localStorage.setItem('token', action.payload.user.token);
        state.user = action.payload.user;
      })
      .addCase(postUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.user.token);
      })
      .addCase(postLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.user.token);
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(putUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(putUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.user.token);
      })
      .addCase(putUser.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(postNewPsot.pending, (state) => {
        state.loading = true;
      })
      .addCase(postNewPsot.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload.article);
        state.data.pop();
      })
      .addCase(postNewPsot.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(putPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(putPost.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePostData = action.payload.article;
      })
      .addCase(putPost.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        state.singlePostData = action.payload.article;
        state.data = state.data.map((item) => {
          if (item.slug === action.payload.article.slug) {
            return action.payload.article;
          }
          return item;
        });
      })
      .addCase(postFavorite.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { onPageChange, onLogout } = appSlice.actions;

export default appSlice.reducer;
