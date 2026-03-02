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

      
      if (isStaffRoute) {
        if (!isLoggedIn) return false; 
        if (isAdmin) return true;     
        return Response.redirect(new URL("/", nextUrl)); 
      }

      
      if (isLoggedIn && isAuthRoute) {
      
        if (nextUrl.pathname.startsWith("/login")) {
          if (isAdmin) {
            return Response.redirect(new URL("/bemen-staff-portal", nextUrl));
          }
          return Response.redirect(new URL("/", nextUrl));
        }
        
        if (!isAdmin) {
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      return true; 
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