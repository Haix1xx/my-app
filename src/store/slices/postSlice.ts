"use client";
"use client";
import Post from "@/types/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state: PostState, action: PayloadAction<Post[]>) => {
      state.posts.push(...action.payload);
    },

    clearPosts: (state: PostState) => {
      state.posts = [];
    },
  },
});

export const { addPosts, clearPosts } = postSlice.actions;

export default postSlice.reducer;
