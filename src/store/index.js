// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice';

export default configureStore({
  reducer: {
    app: appSlice,
  },
});
