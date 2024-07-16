"use client";
import Post from "@/types/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: Post[];
  page: number;
}

const initialState: PostState = {
  posts: [],
  page: 1,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state: PostState, action: PayloadAction<Post[]>) => {
      const filteredPosts = action.payload.filter(
        (incommingPost) =>
          state.posts.findIndex((post) => post._id === incommingPost._id) === -1
      );
      state.posts.push(...filteredPosts);
    },
    clearPosts: (state: PostState) => {
      state.posts = [];
    },
    setCurrentPage: (state: PostState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    incrementPage: (state: PostState) => {
      state.page = state.page + 1;
    },
  },
});

export const { addPosts, clearPosts, setCurrentPage, incrementPage } =
  postSlice.actions;

export default postSlice.reducer;
