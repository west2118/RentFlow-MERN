import Notification from "../models/notification.model.js";
import Payment from "../models/payment.model.js";
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

const postRemindersNotification = async (req, res) => {
  try {
    const { uid } = req.user;
    const { title, message, type } = req.body;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const payments = await Payment.find({
      landlordUid: uid,
      dueDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    const notifications = payments.map((payment) => ({
      userId: payment.tenantUid,
      title,
      message,
      type,
    }));

    await Notification.insertMany(notifications);

    res.status(200).json({ message: "Reminder send to all tenant" });
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

export { postNotification, postRemindersNotification, readNotifications };
