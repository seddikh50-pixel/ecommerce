import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import authMiddleware from "./middlewares/authMiddleware";
import logMiddleware from "./middlewares/logMiddleware";
import adminMiddleware from "./middlewares/adminMiddleware";
import { cookies } from "next/headers";
import authAdmin from "./middlewares/adminMiddleware";
import { userMiddleware } from "./middlewares/userMiddleware";
import { strict } from "assert";




const middleware = async (request: NextRequest) => {
   const pathname = request.nextUrl.pathname
   const cookieStore = await cookies();
   const userCookie = cookieStore.get('user')?.value
   if (pathname.startsWith('/cart')) {
      if (!userCookie) {
         return NextResponse.redirect(new URL("/account", request.url));
      }
      const successToken = await userMiddleware(userCookie)
      if (!successToken.success) return NextResponse.redirect(new URL("/account", request.url));
      return NextResponse.next();
   }

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


}

export default middleware;
// export const config = {
//    matcher: ['/admin/:path*', '/api/:path*'],
// }

export const config = {
   matcher: ["/cart", '/api/:path*', '/admin/:path*']
};