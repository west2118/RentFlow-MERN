import Payment from "../models/payment.model.js";
import Receipt from "../models/receipt.model.js";
import User from "../models/user.model.js";

const postReceipt = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      paymentId,
      fileUrl,
      transactionDate,
      notes,
      method,
      accountNumber,
      amountPaid,
    } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(400).json({ message: "Payment didn't exist" });
    }

    if (uid.toString() !== payment.tenantUid.toString()) {
      return res.status(400).json({ message: "Don't have authorized in this" });
    }

    const newReceipt = await Receipt.create({
      tenantUid: payment.tenantUid,
      landlordUid: payment.landlordUid,
      leaseId: payment.leaseId,
      paymentId,
      fileUrl,
      transactionDate,
      notes,
      accountNumber,
      amountPaid,
      method,
    });

    res
      .status(200)
      .json({ message: "Payment receipt sent successfully!", newReceipt });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getReceipt = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(400).json({ message: "Payment didn't exist" });
    }

    const receipt = await Receipt.findOne({
      paymentId: id,
      status: { $ne: "Rejected" },
    });

    res.status(200).json(receipt);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const acceptReceipt = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    console.log("Data: ", uid, id);

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const receipt = await Receipt.findById(id);
    if (!receipt) {
      return res.status(400).json({ message: "Receipt didn't exist" });
    }

    if (receipt.landlordUid.toString() !== uid.toString()) {
      return res.status(400).json({ message: "Don't have authorized in this" });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(receipt.paymentId, {
      status: "Paid",
      datePaid: receipt.transactionDate,
      method: receipt.method,
    });

    const updatedReceipt = await Receipt.findByIdAndUpdate(id, {
      status: "Accepted",
    });

    res.status(200).json({
      message: "Accepted receipt successfully!",
      updatedPayment,
      updatedReceipt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const rejectReceipt = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const receipt = await Receipt.findById(id);
    if (!receipt) {
      return res.status(400).json({ message: "Receipt didn't exist" });
    }

    if (receipt.landlordUid.toString() !== uid.toString()) {
      return res.status(400).json({ message: "Don't have authorized in this" });
    }

    const updatedReceipt = await Receipt.findByIdAndUpdate(id, {
      status: "Rejected",
    });

    res.status(200).json({
      message: "Declined receipt successfully!",
      updatedReceipt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postReceipt, getReceipt, acceptReceipt, rejectReceipt };
