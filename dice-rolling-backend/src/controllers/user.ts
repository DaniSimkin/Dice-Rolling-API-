const User = require("../models/user");

const createUser = async (body) => {
  console.log("BODY", body);
  try {
    const newUser = new User(body);
    await newUser.save();

    if (newUser) {
      console.log("newUser we get", newUser);
      return newUser;
    }
  } catch (err) {
    console.error(err);
  }
};

const findUserByName = async (body) => {
  const { name } = body;

  const user = await User.findOne({ name }).exec();
  if (user) {
    console.log("user we get", user);
    return returnUserData(user);
  } else {
    const newUser = await createUser(body);
    console.log("new USER", newUser);
    return returnUserData(newUser);
  }
};

// TODO: instead of using this method - I need to get it like this from moongose - read about projection / virtualization
const returnUserData = (userObject) => {
  const { name, role, history } = userObject;
  return { name, role, history };
};

exports.loginOrRegisterUser = async (req: any, res: any) => {
  const { body } = req;

  try {
    const user = await findUserByName(body);
    console.log("findUserByName", user);
    const payload = { ...user, isModerator: user.role === 1 };
    res.status(200).json(payload);
  } catch (err) {
    res.status(400).json({
      error: `There was a problem logging in ${err}`,
    });
  }
};

exports.updateHistory = async (req: any, res: any) => {
  const {
    body: { name, value, isWon },
  } = req;
  // value, isWon

  try {
    const userQueryResult = await User.find({ name });
    const selectedUser = userQueryResult && userQueryResult[0];
    const historyToPush = {
      value,
      isWon,
    };

    let updatedHistory = selectedUser.history;
    updatedHistory.push(historyToPush);

    const updatedUser = { ...selectedUser, history: updatedHistory };

    await User.findOneAndUpdate({ name }, updatedUser, {
      new: true,
    });

    res.status(200).json({
      data: updatedHistory,
    });
  } catch (err) {
    res.status(500).json({
      error: `There was a problem updating history, ${err}`,
    });
  }
};
