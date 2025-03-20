const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  // const body = req.body;
  // if (!body.url) return res.json({ error: "url is required" });
  // const shortID = shortid();
  // await URL.create({
  //   shortId: shortID,
  //   redirectURL: body.url,
  //   visitHistory: [],
  // });
  return res.render("home");
}

async function generateurl(req, res) {
  const body = req.body;
  if (!body.url) return res.json({ error: "url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
  return res.redirect("/");
}

async function Getanalyticsdetail(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totatclicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateNewShortURL,
  Getanalyticsdetail,
  generateurl,
};
