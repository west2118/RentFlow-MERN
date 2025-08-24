import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

const postNotification = async (req, res) => {
  try {
    const { uid } = req.user;
    const { tenantUid, title, message, type } = req.body;

    const user = await User.find({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const tenant = await User.find({ uid: tenantUid });
    if (!tenant) {
      return res.status(400).json({ message: "Tenant didn't exist" });
    }

    const newNotification = await Notification.create({
      landlordUid: uid,
      tenantUid,
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

export { postNotification };
