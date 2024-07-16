"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Post from "@/types/post";

interface GetAllPostResponse {
  message: string;
  data: Post[];
}

interface GetPostByIdResponse {
  message: string;
  data: Post;
}
interface QueryParams {
  page: Number;
  limit: Number;
}
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<GetAllPostResponse, QueryParams>({
      query: (params) => `/api/posts?limit=${params.limit}&page=${params.page}`,
    }),
    getPostById: builder.query<GetPostByIdResponse, string>({
      query: (params) => `/api/posts/${params}`,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "/api/posts",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllPostsQuery, useCreatePostMutation } = postApi;
