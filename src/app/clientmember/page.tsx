"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/clientmember");
    },
  });

  console.log(session?.user);
  console.log(status);
  return (
    <div>
      <h1>Member Client</h1>
    </div>
  );
}
