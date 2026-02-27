// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//     // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//     matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// ১. NextAuth থেকে auth ফাংশনটি বের করে আনুন
const { auth } = NextAuth(authConfig);

// ২. এটিকে 'middleware' নামে অথবা 'default' হিসেবে export করুন
export default auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};