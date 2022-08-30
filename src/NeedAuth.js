import { unstable_getServerSession } from "next-auth/next"
import { getToken } from "next-auth/jwt"
import { authOptions } from "./auth/[...nextauth]"

//Sever side
const NeedAuth = (cb) => async (req, res) => {
  const token = await getToken({ req })
  console.dir(token)
  //const session = await unstable_getServerSession(req, res, authOptions)
  //console.dir(session)
  if (token) {
    return cb(req, res);
  } else {
    return res.send({
        error: "You must be sign in to view the protected content on this page.",
      })
  }
}

export default NeedAuth;