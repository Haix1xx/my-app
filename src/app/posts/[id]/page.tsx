import Post from "@/types/post";
import PostCard from "@/components/Post/PostCard";

export default async function Page({ params }: { params: { id: string } }) {
  const post: Post = await getPost(params.id);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <PostCard post={post} />
      </div>
    </div>
  );
}

async function getPost(id: string) {
  const res = await fetch("http://localhost:3000/api/categories", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const post = (await res.json()).data;
  return post;
}
