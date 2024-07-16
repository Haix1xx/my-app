"use client";
import { useGetAllPostsQuery } from "@/store/api/postApi";
import { useEffect, useState } from "react";
import Post from "../../types/post";
import PostCard from "@/components/Post/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addPosts, incrementPage } from "@/store/slices/postSlice";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.post);
  const { data, isLoading } = useGetAllPostsQuery({
    page: post.page,
    limit: 3,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(addPosts(data.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 1 &&
        !isLoading &&
        data?.data &&
        data?.data.length > 0
      ) {
        dispatch(incrementPage());
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, data, dispatch]);

  const redirectToDetailPost = (_id: string) => {
    router.push(`/posts/${_id}`);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl mt-5">
        {post.posts.map((post: Post) => (
          <PostCard
            post={post}
            key={post._id}
            onClick={() => redirectToDetailPost(post._id)}
          />
        ))}
        {isLoading && <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
}
