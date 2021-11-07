import mongoose from "mongoose";
//const {objectId} = mongoose.Schema;

const diceSchema: mongoose.Schema = new mongoose.Schema(
  {
    presetName: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      trim: true,
    },
    fontColor: {
      type: String,
      trim: true,
    },
    value: {
      type: Number || String,
      trim: true,
    },
    //When winner dice is not a number but an icon
    face: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dice", diceSchema);
