 const validate = (token: string | null) => {

   const validToken = true
   if(!validToken || !token) {
       return false;
   }
   return true
 }



const authMiddleware = (request : Request , token : string | null) => {

    return {isValid  :validate(token)}; // Authorized
}


export default authMiddleware 