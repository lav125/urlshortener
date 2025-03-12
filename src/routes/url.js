const express=require("express");
const { generateNewShortURL,Getanalyticsdetail,generateurl}=require("../controllers/url")

const router=express.Router();


// router.get("/", (req, res)=>{ res.send("<h1>URL Shortner</h1>") })
router.get("/",generateNewShortURL);
router.get("/analytics/:shortId",Getanalyticsdetail);
router.post("/",generateurl)

module.exports=router