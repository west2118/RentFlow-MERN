import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

const postNotification = async (req, res) => {
  try {
    const { uid } = req.user;
    const { userId, title, message, type } = req.body;

    const user = await User.find({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const receiver = await User.find({ uid: userId });
    if (!receiver) {
      return res.status(400).json({ message: "Tenant didn't exist" });
    }

    const newNotification = await Notification.create({
      userId,
      title,
      message,
      type,
    });

    res
      .status(200)
      .json({ message: "Notification sent successfully!", newNotification });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const readNotifications = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.find({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    await Notification.updateMany(
      {
        userId: uid,
        read: false,
      },
      { $set: { read: true } }
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to update notifications" });
  }
};

export { postNotification, readNotifications };
