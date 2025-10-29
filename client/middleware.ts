import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import authMiddleware from "./middlewares/authMiddleware";
import logMiddleware from "./middlewares/logMiddleware";
import adminMiddleware from "./middlewares/adminMiddleware";
import { cookies } from "next/headers";
import authAdmin from "./middlewares/adminMiddleware";
import { userMiddleware } from "./middlewares/userMiddleware";




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



   // const cookieStore = await cookies();
   // const token =    // const token = cookieStore.get('token')?.value



   // if (pathname.startsWith('/api')) {
   //    if (pathname.startsWith('/api/admin/login')) {
   //       return NextResponse.next()
   //    }
   //    if (!token) {
   //       return NextResponse.json({ msg: 'unauthorized' }, { status: 404 })
   //    }
   //    const isAdmin = await authAdmin(token || "")
   //    if (!isAdmin) {
   //       return NextResponse.json({ msg: 'forbidden' }, { status: 404 })
   //    }
   //    return NextResponse.next()
   // }



   // if (pathname.startsWith('/admin')) {
   //    if (!token) {
   //       return NextResponse.redirect(new URL('/login', request.url))
   //    }
   //    const isAdmin = await authAdmin(token || "")
   //    if (!isAdmin) {
   //       return NextResponse.redirect(new URL('/login', request.url))
   //    }
   //    return NextResponse.next()
   // }








}

export default middleware;
// export const config = {
//    matcher: ['/admin/:path*', '/api/:path*'],
// }

export const config = {
   matcher: ["/cart", "/"],
};