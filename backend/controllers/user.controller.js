import User from "../models/user.model.js";

const putUser = async (req, res) => {
  try {
    const { uid } = req.user;
    const { firstName, lastName, email, role, notifications, verification } =
      req.body;

    const user = await User.findOneAndUpdate(
      { uid },
      {
        uid,
        firstName,
        lastName,
        email,
        role,
        notifications,
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

export { putUser };
