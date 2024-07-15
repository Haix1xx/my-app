"use client";
import { useGetAllPostsQuery } from "@/store/api/postApi";
import { useEffect, useState } from "react";
import Post from "../../types/post";
import PostCard from "@/components/Post/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addPosts } from "@/store/slices/postSlice";

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetAllPostsQuery({
    page,
    limit: 3,
  });

  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.post);

  console.log(data);
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1 &&
      !isLoading &&
      data?.data &&
      data?.data.length > 0
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (data?.data) {
      dispatch(addPosts(data.data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, data]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl mt-5">
        {post.posts.map((post: Post) => (
          <PostCard post={post} key={post._id} />
        ))}
        {isLoading && <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
}
