import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/member");
  }
  console.log(session);
  return (
    <div>
      <p>This is member page</p>
    </div>
  );
}
