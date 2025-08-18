import Invite from "../models/invite.model.js";
import Lease from "../models/lease.model.js";
import Payment from "../models/payment.model.js";
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

      const updatedLease = await Lease.findOneAndUpdate(
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

      await Payment.updateMany(
        { unitId: invite.unitId, leaseId: updatedLease._id },
        { tenantUid: uid }
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

const getSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ uid: id });
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search;

    const total = await Unit.countDocuments({
      landlordUid: uid,
      status: "Occupied",
    });
    const units = await Unit.find({ landlordUid: uid, status: "Occupied" })
      .skip(skip)
      .limit(limit);

    let getTenants = [];

    for (const unit of units) {
      const [activeLease, tenant] = await Promise.all([
        Lease.findOne({
          unitId: unit._id,
          isActive: true,
        }),
        User.findOne({ uid: unit.tenantUid }),
      ]);

      getTenants.push({
        ...unit.toObject(),
        tenantName: `${tenant.firstName} ${tenant.lastName}` || null,
        tenantGmail: tenant.email || null,
        lease: activeLease || null,
      });
    }

    if (search) {
      getTenants = getTenants.filter(
        (u) =>
          u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          u.unitNumber?.toLowerCase().includes(search.toLowerCase()) ||
          u.tenantName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      tenants: getTenants,
      total: getTenants.length,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { putUser, getSpecificUser, getUser, getLandlordTenants };
