import { NextResponse } from "next/server";

import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDatabase from "@/config/database";
import { hashPassword } from "@/libs/auth";

export async function POST(request: Request) {
  try {
    await connectDatabase();
    const body = await request.json();
    const userData = body;
    console.log(userData);
    if (!userData.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }

    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate email" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;

    const user = await User.create(userData);
    console.log(user);
    return NextResponse.json({ message: "success", user }, { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
