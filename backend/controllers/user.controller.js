import User from "../models/user.model.js";

const putUser = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      firstName,
      lastName,
      email,
      role,
      notifications,
      accountType,
      numberOfProperties,
      moveInDate,
      emergencyContact,
      verification,
    } = req.body;

    const user = await User.findOneAndUpdate(
      { uid },
      {
        uid,
        firstName,
        lastName,
        email,
        role,
        notifications,
        accountType,
        numberOfProperties,
        moveInDate,
        emergencyContact,
        verification,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { putUser, getUser };
