import connectDatabase from "@/config/database";
import Post from "@/models/Post";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    await connectDatabase();
    const { id } = params;
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { message: "Post not found", data: null },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "success", data: post },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
