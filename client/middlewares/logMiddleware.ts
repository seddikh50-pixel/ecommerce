export function logMiddleware (req:Request) {
    const token =  req.headers.get('Authorization')
    console.log(token)
    return {response : req.method + " " + req.url};
}



export default logMiddleware;