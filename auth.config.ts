import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      const isAdmin = userRole === "admin" || userRole === "moderator";

      const isStaffRoute = nextUrl.pathname.startsWith("/bemen-staff-portal");
      const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");

      // ১. স্টাফ পোর্টাল প্রোটেকশন (Admin/Moderator Only)
      if (isStaffRoute) {
        if (!isLoggedIn) return false; // লগইন না থাকলে সরাসরি /login এ নিয়ে যাবে
        if (isAdmin) return true;      // অ্যাডমিন হলে এক্সেস পাবে
        return Response.redirect(new URL("/", nextUrl)); // সাধারণ ইউজারকে হোমপেজে পাঠাবে
      }

      // ২. লগইন থাকা অবস্থায় লগইন/রেজিস্টার পেজে গেলে রিডাইরেক্ট
      if (isLoggedIn && isAuthRoute) {
        if (isAdmin) {
          return Response.redirect(new URL("/bemen-staff-portal", nextUrl));
        }
        return Response.redirect(new URL("/", nextUrl)); // সাধারণ ইউজার প্রোফাইল নেই তাই হোমে যাবে
      }

      return true; // বাকি সব পাবলিক রুট ওপেন
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // <--- এই লাইনটি অবশ্যই থাকতে হবে, এরর দূর করার জন্য
} satisfies NextAuthConfig;