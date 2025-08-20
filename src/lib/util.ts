import { auth } from "@clerk/nextjs/server"

export const getUser = async () => {
     const {sessionClaims, userId} = await auth(); 
     const role = (sessionClaims?.metadata as {role?:string}).role; 
     return {role, userId}; 
}

