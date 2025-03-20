const jwt = require("jsonwebtoken");
const secret = "#lav$harma12";

function Setuser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role:user.role,
    },
    secret
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
