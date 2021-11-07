import mongoose from "mongoose";
const uuidv1 = require("uuidv1");
const crypto = require("crypto");

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    // from client side we will receive the true password but in the db we'll save the hashed version of it
    // salt will be used to generate the hashed_password
    salt: {
      type: String,
    },
    // User or Moderator - by default 0 will be user and 1 will be for Moderator
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (this, password) {
    this._password = password;
    // Will generate a random string
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this) {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
