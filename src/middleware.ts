import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import ROLE from "./common/roles";
import { adminPaths, protectedPaths, userPaths } from "./common/authPaths";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = await getToken({ req });
  console.log(token);
  const response = restrict(pathname, protectedPaths, token, null, req.url);
  if (response) return response;

  const adminResponse = restrict(
    pathname,
    adminPaths,
    token,
    ROLE.ADMIN,
    req.url
  );
  if (adminResponse) return adminResponse;

  const userResponse = restrict(pathname, userPaths, token, ROLE.USER, req.url);
  if (userResponse) return userResponse;

  return NextResponse.next();
}

function restrict(
  pathname: string,
  paths: string[],
  token: JWT | null,
  role: string | null,
  url: string
) {
  const isInPaths = paths.some(
    (path) => path === pathname || pathname.startsWith(path)
  );

  if (isInPaths) {
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", url));
    }

    if (role && token._doc.role !== role) {
      return NextResponse.rewrite(new URL("/denied", url));
    }
  }
}
