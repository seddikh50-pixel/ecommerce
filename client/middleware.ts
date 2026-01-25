import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import authAdmin from "./middlewares/adminMiddleware";
import { userMiddleware } from "./middlewares/userMiddleware";

const middleware = async (request: NextRequest) => {
   const pathname = request.nextUrl.pathname
   const cookieStore = await cookies();
   const userCookie = cookieStore.get('user')?.value

   // حماية cart و success
   if (pathname.startsWith('/cart') || pathname.startsWith('/success')) {
      if (!userCookie) {
         return NextResponse.redirect(new URL("/account", request.url));
      }
      const successToken = await userMiddleware(userCookie)
      if (!successToken.success) {
         return NextResponse.redirect(new URL("/account", request.url));
      }
      return NextResponse.next();
   }

   // حماية admin
   if (pathname.startsWith('/admin')) {
      const token = cookieStore.get('token')?.value
      if (!token) {
         return NextResponse.redirect(new URL("/login", request.url));
      }
      const jwtVerify = await authAdmin(token)
      if (!jwtVerify) {
         return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next()
   }

   // ✅ مهم جدًا: السماح لباقي المسارات
   return NextResponse.next();
}

export default middleware;

export const config = {
   matcher: ["/cart", "/success", "/admin/:path*", "/api/:path*"],
};
