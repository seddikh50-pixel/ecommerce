
import { NextResponse } from 'next/server';
export function GET(request: Request) {
    try {
        const token = request.headers.get('Authorization');
        console.log(token)
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    } catch (error) {
        
    }
}