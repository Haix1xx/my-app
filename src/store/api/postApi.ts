"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Post from "@/types/post";

interface GetAllPostReponse {
  message: string;
  data: Post[];
}

interface QueryParams {
  page: Number;
  limit: Number;
}
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<GetAllPostReponse, QueryParams>({
      query: (params) => `/api/posts?limit=${params.limit}&page=${params.page}`,
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
