import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { FC } from "react";

const Nav: FC = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-gray-600 text-gray-100 sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>Bloggery</div>
        <div className="flex gap-10">
          <Link href="/posts">Home</Link>
          <Link href="/activities">Recent Activities</Link>
          <Link href="/posts/create">Create Post</Link>
          <Link href="/clientmember">Client Member</Link>
          <Link href="/member">Member</Link>
          <Link href="/categories">Categories</Link>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <>
              <Link href="/api/auth/signin">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
