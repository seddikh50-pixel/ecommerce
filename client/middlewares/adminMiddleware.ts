

import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const authAdmin = async (token: string) => {


    try {

        const secret = new TextEncoder().encode(process.env.ADMIN_SECRET_KEY);
        const { payload } = await jwtVerify(token, secret);
        if (payload.role !== "admin") {
            return false
        }
        return true
    } catch (error) {
        return false

    }

}


export default authAdmin