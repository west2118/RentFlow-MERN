import Invite from "../models/invite.model.js";
import Lease from "../models/lease.model.js";
import Unit from "../models/unit.model.js";
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
      inviteToken,
    } = req.body;

    let unitId = null;

    if (inviteToken) {
      const invite = await Invite.findOne({
        token: inviteToken,
        used: false,
      });

      if (
        !invite ||
        invite.isActive === false ||
        invite.expiresAt < Date.now()
      ) {
        return res.status(400).json({ error: "Invalid or expired invite." });
      }

      unitId = invite.unitId;

      await Lease.findOneAndUpdate(
        { unitId: invite.unitId, isActive: true },
        {
          tenantUid: uid,
        },
        { new: true }
      );

      await Unit.findByIdAndUpdate(
        invite.unitId,
        {
          tenantUid: uid,
          status: "Occupied",
        },
        { new: true }
      );

      invite.used = true;
      await invite.save();
    }

    let updatedUserData = {
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
    };

    if (unitId) {
      updatedUserData.unitId = unitId;
    }

    const user = await User.findOneAndUpdate({ uid }, updatedUserData, {
      upsert: true,
      new: true,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
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

const getLandlordTenants = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const units = await Unit.find({ landlordUid: uid, status: "Occupied" });

    const getTenants = [];

    for (const unit of units) {
      const activeLease = await Lease.findOne({
        unitId: unit._id,
        isActive: true,
      });

      const tenant = await User.findOne({ uid: unit.tenantUid });

      getTenants.push({
        ...unit.toObject(),
        leaseEnd: activeLease?.leaseEnd || null,
        paymentSchedule: activeLease?.paymentSchedule || null,
        tenantName: `${tenant.firstName} ${tenant.lastName}` || null,
        tenantGmail: tenant.email || null,
      });
    }

    res.status(200).json(getTenants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { putUser, getUser, getLandlordTenants };
