import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    user: JWT;
  }

  interface User {
    _doc: {
      _id: string;
      username: string;
      email: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _doc: {
      _id: string;
      username: string;
      email: string;
      role: string;
    };
  }
}
