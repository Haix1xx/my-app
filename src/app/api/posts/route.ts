import connectDatabase from "@/config/database";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  try {
    await connectDatabase();
    const body = await req.json();

    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    const post = await Post.create({ ...body, user: session.user.sub });

    return NextResponse.json(
      { message: "success", data: post },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDatabase();
    const params = new URLSearchParams(new URL(req.url).searchParams);
    const page = params.get("page") ?? "1";
    const limit = params.get("limit") ?? "5";
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate skip based on page and limit
    const skip = (pageNumber - 1) * limitNumber;

    const posts = await Post.find()
      .populate("user")
      .skip(skip)
      .limit(limitNumber);

    return NextResponse.json(
      { message: "success", data: posts },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
