const { Getuser } = require("../service/auth");

function checkforAuthentication(req, res, next) {
  const tokencookie = req.cookies?.token;
  req.user = null;
  if (!tokencookie) return next();
  const token = tokencookie;
  const user = Getuser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorised");


    return next();
  };
}

module.exports = {
  checkforAuthentication,
  restrictTo,
};
