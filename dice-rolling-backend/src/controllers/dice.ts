const Dice = require("../models/dice");
const { errorHandler } = require("../helpers/dbErrorHandler");
/**
 * TODO:
 * we get dice object from req
 * we store it inside db according to the params we got
 * and we return response 201 with the new dice saved in frontend
 */
exports.createDice = async (req, res) => {
  const { body } = req;
  // console.log("BODY", body);
  const newDice = new Dice(body);

  newDice.save((err, dice: typeof Dice) => {
    if (err) {
      const error = errorHandler(err);
      return res.status(500).json({
        error,
      });
    }

    const { color, fontColor, value, face, presetName } = dice;
    const payload = {
      presetName,
      color,
      fontColor,
      value,
      face,
    };

    return res.status(201).json({
      status: "success",
      data: payload,
    });
  });
};

exports.getAllDices = async (req, res) => {
  try {
    const dicePresets = (await Dice.find({})) || [];
    const formattedDicePresets = dicePresets.map((dice) => {
      const { presetName, color, fontColor, value, face } = dice;
      return { presetName, color, fontColor, value, face };
    });

    res.status(200).json({
      data: formattedDicePresets,
    });
  } catch (err) {
    res.status(500).json({
      error: `Couldn't get dices ${err}`,
    });
  }
};

exports.updateDice = async (req, res) => {
  const {
    body: { presetName, diceConfig },
  } = req;
  console.log("preset name", presetName);
  console.log("diceConfig", diceConfig);
  try {
    const updatedDice = await Dice.findOneAndUpdate(
      { presetName },
      diceConfig,
      { new: true }
    );
    res.status(200).json({
      data: updatedDice,
    });
  } catch (err) {
    res.status(500).json({
      error: `Couldn't update dice ${err}`,
    });
  }
};

exports.deleteDice = async (req, res) => {
  const {
    body: { presetName },
  } = req;
  console.log("DELETE DICE!");
  try {
    await Dice.deleteOne({ presetName });
    res.status(204).json({
      message: "successfully deleted preset",
    });
  } catch (err) {
    res.status(500).json({
      error: `Couldn't delete dice ${err}`,
    });
  }
};
