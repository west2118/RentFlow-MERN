import Lease from "../models/lease.model.js";
import Payment from "../models/payment.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";

const postLease = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;
    const {
      leaseStart,
      leaseEnd,
      rentAmount,
      securityDeposit,
      paymentSchedule,
      notes,
    } = req.body;

    console.log(req.body);

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const unit = await Unit.findById(id);
    if (!unit) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    if (unit.landlordUid.toString() !== uid.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have authorized in this unit" });
    }

    const alreadyHaveLease = await Lease.findOne({
      unitId: id,
      isActive: true,
    });
    if (alreadyHaveLease) {
      return res.status(400).json({ message: "Unit already have lease" });
    }

    const newLease = new Lease({
      unitId: id,
      landlordUid: uid,
      leaseStart,
      leaseEnd,
      rentAmount: Number(rentAmount),
      securityDeposit: Number(securityDeposit),
      paymentSchedule,
      unitNumber: unit.unitNumber,
      notes,
    });
    await newLease.save();

    const payments = [];
    let current = new Date(leaseStart);
    const leaseEndDate = new Date(leaseEnd);

    while (current < leaseEndDate) {
      const dueDate = new Date(current);

      let amount = rentAmount;

      const isFirstMonth =
        current.getMonth() === new Date(leaseStart).getMonth() &&
        current.getFullYear() === new Date(leaseStart).getFullYear();

      if (isFirstMonth) {
        const daysInMonth = new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          0
        ).getDate();

        const leaseStartDay = new Date(leaseStart).getDate();
        const proratedDays = daysInMonth - leaseStartDay + 1;
        amount = (rentAmount / daysInMonth) * proratedDays;
      }

      payments.push({
        leaseId: newLease._id,
        unitId: id,
        landlordUid: uid,
        dueDate: new Date(dueDate),
        amount: Math.round(amount),
        status: "Pending",
      });

      current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }

    console.log(payments);

    await Payment.insertMany(payments);

    res.status(200).json({ message: "Lease created successfully!", newLease });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postLease };
