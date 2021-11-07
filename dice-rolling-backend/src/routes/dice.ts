import express from "express";
const router = express.Router();

const {
  createDice,
  getAllDices,
  updateDice,
  deleteDice,
} = require("../controllers/dice");

router.post("/dice/createDice", createDice);
router.get("/dice/getAllDices", getAllDices);
// router.get("/dice/getDice/:id", readDice);
router.post("/dice/updateDice", updateDice);
router.post("/dice/deleteDice", deleteDice);

module.exports = router;
