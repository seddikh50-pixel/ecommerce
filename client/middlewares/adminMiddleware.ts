import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';



const adminMiddleware = async (req: Request) => {
    const token = req.headers.get('Authorization'); 
    console.log(token)
    if (!token) {
        return new Response('Unauthorized', { status: 401 });
    }
    return NextResponse.next();
}


export default adminMiddleware;