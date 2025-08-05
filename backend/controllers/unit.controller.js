import Lease from "../models/lease.model.js";
import Payment from "../models/payment.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";

const getUnitWithLeaseStatus = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const units = await Unit.find({ landlordUid: uid });

    const getUnitWithLeaseStatus = [];

    for (const unit of units) {
      const activeLease = await Lease.findOne({
        unitId: unit._id,
        isActive: true,
      });

      let tenantName = null;

      if (activeLease?.tenantUid) {
        const tenant = await User.findOne({ uid: activeLease.tenantUid });
        tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : null;
      }

      getUnitWithLeaseStatus.push({
        ...unit.toObject(),
        hasLease: !!activeLease,
        tenantName,
        lease: activeLease || null,
      });
    }

    res.status(200).json(getUnitWithLeaseStatus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserUnitAndLease = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

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

    const paymentMonth = await Payment.findOne({
      tenantUid: uid,
      dueDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    const unit = await Unit.findById(user.unitId);

    const lease = await Lease.findOne({
      isActive: true,
      tenantUid: user.uid,
      unitId: user.unitId,
    });

    res.status(200).json({ unit, lease, paymentMonth });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserUnitAndUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ uid: id });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const unit = await Unit.findOne({ tenantUid: id });
    if (!unit) {
      return res.status(400).json({ message: "Unit didn't exist" });
    }

    const landlord = await User.findOne({ uid: unit.landlordUid });
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }

    const unitWithLandlord = {
      ...unit.toObject(),
      landlord: `${landlord.firstName} ${landlord.lastName}`,
    };

    res.status(200).json({ user, unit: unitWithLandlord });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordUnits = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const units = await Unit.find({ landlordUid: uid });

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

    const paymentMonth = await Payment.find({
      landlordUid: uid,
      dueDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    res.status(200).json({ units, paymentMonth });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTotalLastMonthUnits = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();

    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    const lastMonthUnits = await Unit.countDocuments({
      landlordUid: uid,
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });

    res.status(200).json(lastMonthUnits);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const postUnit = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      name,
      unitNumber,
      floor,
      notes,
      type,
      bathrooms,
      bedrooms,
      size,
      address,
      rentAmount,
      photos,
      status,
      amenities,
    } = req.body;

    console.log(req.body);

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    if (user.role === "tenant") {
      return res
        .status(400)
        .json({ message: "You don't have authorized to create unit" });
    }

    const newUnit = new Unit({
      landlordUid: uid,
      name,
      unitNumber,
      floor,
      type,
      size,
      address,
      rentAmount,
      photos,
      status,
      notes,
      amenities,
      ...(bedrooms !== undefined && { bedrooms }),
      ...(bathrooms !== undefined && { bathrooms }),
    });
    await newUnit.save();

    res.status(200).json({ message: "Unit created successfully!", newUnit });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUnit = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const unit = await Unit.findById(id);

    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const putUnit = async (req, res) => {
  try {
    const { id } = req.params;

    const unit = await Unit.findById(id);
    if (!unit) {
      return res.status(400).json({ message: "Unit didn't exist" });
    }

    const updatedUnit = await Unit.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Unit updated successfully!", updatedUnit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  postUnit,
  getUserUnitAndLease,
  getUserUnitAndUserInfo,
  getLandlordUnits,
  getTotalLastMonthUnits,
  getUnitWithLeaseStatus,
  getUnit,
  putUnit,
};
