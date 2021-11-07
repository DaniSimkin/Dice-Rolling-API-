import { Request, Response } from "express";
// import jwt from "jsonwebtoken"; // to generate signed token
// import expressJwt from "express-jwt"; // for authorization check
// import { request } from "http";
// import { Error } from "mongoose";

const User = require("../models/user");
// const { errorHandler } = require("../helpers/dbErrorHandler");
const { returnUserData } = require("../controllers/user");

// const user = new User(body);
// user.save((err, user: typeof User) => {
//   if (err) {
//     throw new Error("There was a problem with user creation");
//   }

//   return user;
// });

exports.moderator = (req: Request, res: Response) => {
  // find the user based on name
  const { name, password } = req.body;
  User.findOne({ name }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that name does not exist",
      });
    }

    // if user is found make sure the name and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Name and password don't match",
      });
    }

    if (user.role == 1) {
      return res.status(401).json({
        error: "User is already a moderator",
      });
    }

    // generate a signed token with user id and secret
    //const token = jwt.signed({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    //res.cookie("t", token, { expires: new Date() });
    // return response with user and token to front end client
    user.role = 1;
    const { _id, name, role } = user;
    return res.json({ user: { _id, name, role } });
  });
};
