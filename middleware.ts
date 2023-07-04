import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
      authorized({ req, token }) {
        //token
        return !!token
      },
    },
  })
  
//export const config = { matcher: ["/admin", "/me"] }