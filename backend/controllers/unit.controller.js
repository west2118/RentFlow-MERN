import Lease from "../models/lease.model.js";
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
        leaseEnd: activeLease?.leaseEnd || null,
        tenantName,
      });
    }

    res.status(200).json(getUnitWithLeaseStatus);
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
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postUnit, getUnitWithLeaseStatus };
