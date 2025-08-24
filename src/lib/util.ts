import { auth } from "@clerk/nextjs/server"

export const getCurrentUser = async () => {
     const {sessionClaims, userId} = await auth(); 
     const role = (sessionClaims?.metadata as {role?:string}).role; 
     return {role, userId}; 
}

