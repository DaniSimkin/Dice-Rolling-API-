import express from "express";

const router = express.Router();

const { loginOrRegisterUser, updateHistory } = require("../controllers/user");

// import function from controller that gets user acording to it's username
// if we have the username in our db - check password
// if we don't have the username in our db - create a new user

router.post("/loginOrRegisterUser", loginOrRegisterUser);
router.post("/updateHistory", updateHistory);

module.exports = router;
