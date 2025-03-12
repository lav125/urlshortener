const User = require("../models/user");

async function handlesignup(req, res) {
  console.log(req.body);
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("home");
}

async function handlelogin(req, res) {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "invalid username or password",
    });
  return res.redirect("/");
}

module.exports = {
  handlesignup,
  handlelogin,
};
