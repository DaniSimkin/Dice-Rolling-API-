import express from "express";
const router = express.Router();

const { moderator } = require("../controllers/auth");
const { userCreationValidator } = require("../validator");

router.post("/requestModeratorPriviliges", moderator);

router.post("/getConnectionStatus", (req, res) => {
  const { body } = req;
  console.log("body from backend", body);
  const payload = {
    ...body,
    comingFromBackend: true,
  };
  res.status(200).json(payload);
});

module.exports = router;
