import React from "react";
import Post from "@/types/post";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { user, content, images } = post;
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="flex-shrink-0">
          <Image
            className="h-10 w-10 rounded-full"
            src={`https://avatars.dicebear.com/api/human/${user._id}.svg`}
            width={30}
            height={30}
            alt={`${user.username}'s avatar`}
          />
        </div>
        <div className="ml-3">
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <p className="text-gray-800">{content}</p>
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {images.map((image, index) => (
            <Image
              key={index}
              className="rounded-md"
              src={image}
              width={400}
              height={400}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
