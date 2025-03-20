const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

function Setuser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role:user.role,
    },
    secret,
    {expiresIn:"1m"}
  );
}

function Getuser(token) {
  if (!token) return null;
  try{
    return jwt.verify(token, secret);
  }
  catch(error){
    return null;
  }
 
}

module.exports = {
  Setuser,
  Getuser,
};
