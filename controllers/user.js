var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("config");
const multer = require("multer");
const path = require("path");
var bcrypt = require("bcryptjs");
var {
    validateuser,
    user
  } = require("../models/user");
  var {
 
    author
  } = require("../models/author");


  router.post("/signup",  parseUrlencoded, async (req, res, next) => {
    var {
      error
    } = validateuser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let userr = await user.findOne({
      email: req.body.email
    });
    if (userr) {
      return res.status(400).send("user already registered.");
    }
  
    userr = new user({
        name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      Age: req.body.Age,
      phone: req.body.phone,
      country: req.body.country,
      img: req.body.img,
    });
  
    var salt = await bcrypt.genSalt(10);
    userr.password = await bcrypt.hash(userr.password, salt);
    await userr.save();
  
    
    res.status(200).json({
        userr
    });
  });


  router.get("/account/:id", async (req, res) => {

    let user_account = await user.findOne({
      _id: req.params.id
    });
  
    res.json(user_account)
  });
  



  router.get("/author/account/:id", async (req, res) => {

    let author_account = await author.findOne({
      _id: req.params.id
    });
  
    res.json(author_account)
  });










  module.exports = router;