
import { NextResponse } from 'next/server';
export  function POST(request: Request) {
    const autheader =  request.headers.get('Authorization')
    console.log(autheader)
    if(!autheader || !autheader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = autheader.split(' ')[1]

    return NextResponse.json({ message: 'Token is valid', role :"admin" }, { status: 200 });
    
}