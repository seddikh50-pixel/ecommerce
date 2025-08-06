import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import authMiddleware from "./middlewares/authMiddleware";
import logMiddleware from "./middlewares/logMiddleware";
import adminMiddleware from "./middlewares/adminMiddleware";



const middleware = (request: NextRequest) => {
   
   if(request.nextUrl.pathname.startsWith('/api')){
    return NextResponse.next()
   }
  
 
}

export default middleware;
export const config = {
     matcher: ['/api/:path*','/admin/:path*'],
}