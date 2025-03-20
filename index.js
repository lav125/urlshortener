const express = require("express");
const path=require("path");
const cookieparser=require("cookie-parser");
const dotenv=require("dotenv");
dotenv.config();
const connectDB = require("./src/utils/connectDB");

const PORT= process.env.PORT;
const URL = require("./src/models/url");
const urlRoute = require("./src/routes/url");
const staticRoute=require("./src/routes/staticRouter")
const userRoute=require("./src/routes/user");
const {checkforAuthentication,restrictTo}=require("./src/middlewares/auth")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforAuthentication)

app.set("view engine","ejs");
app.set("views",path.resolve("./src/views"));
app.use('/',staticRoute);
app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user",userRoute);

// app.use("/analytics/:shortId",urlRoute)


// Fixing the route path and wrapping it in a try-catch block
app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true } // Ensures the updated document is returned
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error fetching short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT,()=>{
  console.log(`server is running on the port ${PORT}`);
  connectDB();
})
