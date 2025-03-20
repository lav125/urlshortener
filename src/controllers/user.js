
const User = require("../models/user");
const { Setuser } = require("../service/auth");

async function handlesignup(req, res) {
  // console.log(req.body);
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("home");
}

async function handlelogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "invalid username or password",
    });

  const token = Setuser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handlesignup,
  handlelogin,
};
