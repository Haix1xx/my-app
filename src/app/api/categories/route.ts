import connectDatabase from "@/config/database";
import Category from "@/models/Category";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDatabase();
    const body = await req.json();

    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const category = await Category.create(body);

    return NextResponse.json(
      { message: "success", data: category },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDatabase();
    const categories = await Category.find();

    return NextResponse.json(
      { message: "success", data: categories },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
