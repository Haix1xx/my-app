import { configureStore } from "@reduxjs/toolkit";

import { postApi } from "./api/postApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import activityReducer from "./slices/activitySlice";
import postReducer from "./slices/postSlice";

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    activity: activityReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
