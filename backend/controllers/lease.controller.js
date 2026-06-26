import Lease from "../models/lease.model.js";
import Payment from "../models/payment.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";

const postLease = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const {
      leaseStart,
      leaseEnd,
      rentAmount,
      securityDeposit,
      paymentSchedule,
      notes,
      documents,
    } = req.body;

    console.log(req.body);

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const unit = await Unit.findById(id);
    if (!unit) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    if (unit.landlordId.toString() !== _id.toString()) {
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
      landlordId: _id,
      leaseStart,
      leaseEnd,
      rentAmount: Number(rentAmount),
      securityDeposit: Number(securityDeposit),
      paymentSchedule,
      unitNumber: unit.unitNumber,
      notes,
      documents,
    });
    await newLease.save();


    res.status(200).json({ message: "Lease created successfully!", newLease });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLease = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    console.log(id);

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const tenant = await User.findById(id);
    if (!tenant) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const lease = await Lease.findOne({
      tenantId: id,
      isActive: true,
    });

    res.status(200).json(lease);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postLease, getLease };
