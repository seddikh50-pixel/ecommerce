

// import { jwtVerify } from 'jose';
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//     try {
//         const cookieStore = cookies();
//         const token = (await cookieStore).get("token")?.value;
        
//         if (!token) {
//             return NextResponse.json({ success: false, role: null, error: 'Unauthorized' });
//         }

//         const secret = new TextEncoder().encode(process.env.ADMIN_SECRET_KEY);
//         const { payload } = await jwtVerify(token, secret);
//         if (payload.role !== "admin") {
//             return NextResponse.json({ success: false, role: null }, { status: 403 });
//         }
//         return NextResponse.json({ message: 'Token is valid', role: payload.role }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ message: 'Token is expired', role: null, error: error }, { status: 200 });

//     }

// }

// ,{ status: 401 }