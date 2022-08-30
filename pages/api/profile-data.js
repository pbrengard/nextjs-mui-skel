
import { getToken } from "next-auth/jwt"
import DBSchema from "../../src/DBLogicalSchema"


export default async function handler(req, res) {
  const token = await getToken({ req })
  if (!token) {
    return res.send({
      error: "You must be sign in to view the protected content on this page.",
    })
  }
  console.log('method '+req.method)
  if (req.method === 'POST') {
    let user = await DBSchema.sequelize.models.ProfileData.findByPk(token.sub);
    if (!user) {
      user = await DBSchema.sequelize.models.ProfileData.create({ UserId: token.sub });
    }
    console.log(req.body.name);
    user.AltName = req.body.name;
    await user.save();

    res.status(200).send({ result: "OK" });
  } else {

    const user = await DBSchema.sequelize.models.ProfileData.findByPk(token.sub);
    
    res.status(200).json({ name: user ? user.AltName : token.name, email: token.email, picture: token.picture });
  }
}
