import Invite from "../models/invite.model.js";
import Lease from "../models/lease.model.js";
import Notification from "../models/notification.model.js";
import Payment from "../models/payment.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";

const putUser = async (req, res) => {
  try {
    const { _id } = req.user;
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
    let inviteObj = null;

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
      inviteObj = invite;
    }

    let updatedUserData = {
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

    const user = await User.findByIdAndUpdate(_id, updatedUserData, {
      upsert: true,
      new: true,
    });

    if (inviteObj) {
      const updatedLease = await Lease.findOneAndUpdate(
        { unitId: inviteObj.unitId, isActive: true },
        {
          tenantId: _id,
        },
        { new: true }
      );

      await Unit.findByIdAndUpdate(
        inviteObj.unitId,
        {
          tenantId: _id,
          status: "Occupied",
        },
        { new: true }
      );

      if (updatedLease) {
        await Payment.updateMany(
          { unitId: inviteObj.unitId, leaseId: updatedLease._id },
          { tenantId: _id }
        );
      }

      inviteObj.used = true;
      await inviteObj.save();
    }



    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const notifications = await Notification.find({
      userId: _id,
    });

    res.status(200).json({ user, notifications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const updatedUserInfo = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "User info updated successfully!", updatedUserInfo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordTenants = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search;

    const query = {
      landlordId: _id,
      status: "Occupied",
    };

    const total = await Unit.countDocuments(query);
    const units = await Unit.find(query).skip(skip).limit(limit);

    let getTenants = [];

    for (const unit of units) {
      const [activeLease, tenant] = await Promise.all([
        Lease.findOne({
          unitId: unit._id,
          isActive: true,
        }),
        User.findById(unit.tenantId),
      ]);

      if (activeLease) {
        getTenants.push({
          ...unit.toObject(),
          tenantName: tenant ? `${tenant.firstName} ${tenant.lastName}` : "Unknown Tenant",
          tenantGmail: tenant ? tenant.email : "No Email",
          lease: activeLease || null,
        });
      }
    }

    if (search) {
      getTenants = getTenants.filter(
        (u) =>
          u.tenantName?.toLowerCase().includes(search.toLowerCase()) ||
          u.tenantGmail?.toLowerCase().includes(search.toLowerCase()) ||
          u.unitNumber?.toLowerCase().includes(search.toLowerCase())
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

const getLandlordAllTenants = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const units = await Unit.find({
      landlordId: _id,
    });

    const tenantIds = units.map((unit) => unit.tenantId);

    const tenants = await User.find({ _id: { $in: tenantIds } });

    let tenantAndUnit = [];

    for (const tenant of tenants) {
      const unit = await Unit.findOne({ tenantId: tenant._id });

      tenantAndUnit.push({
        ...tenant.toObject(),
        unitNumber: unit ? unit.unitNumber : "No Unit",
      });
    }

    res.status(200).json(tenantAndUnit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  putUser,
  getSpecificUser,
  getUser,
  getLandlordTenants,
  getLandlordAllTenants,
  editUser,
};
