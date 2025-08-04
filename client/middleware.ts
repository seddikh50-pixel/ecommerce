import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import authMiddleware from "./middlewares/authMiddleware";
import logMiddleware from "./middlewares/logMiddleware";
import adminMiddleware from "./middlewares/adminMiddleware";



const middleware = (request: NextRequest) => {

  

}

export default middleware;
export const config = {
    matcher: '/api/:path*',
}