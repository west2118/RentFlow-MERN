import Lease from "../models/lease.model.js";
import Payment from "../models/payment.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";
import Maintenance from "../models/maintenance.model.js";
import { getSimulatedPayments } from "../utils/paymentGenerator.js";

const getUnitWithLeaseStatus = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    const query = { landlordId: _id };

    const units = await Unit.find(query);

    const getUnitWithLeaseStatus = [];

    for (const unit of units) {
      const activeLease = await Lease.findOne({
        unitId: unit._id,
        isActive: true,
      });

      let tenantName = null;

      if (activeLease?.tenantId) {
        const tenant = await User.findById(activeLease.tenantId);
        tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : null;
      }

      let derivedStatus = unit.status;
      const now = new Date();

      if (activeLease && activeLease.leaseEnd > now) {
        derivedStatus = "Occupied";
        if (unit.status !== "Occupied") {
          unit.status = "Occupied";
          await unit.save();
        }
      } else if (activeLease && activeLease.leaseEnd <= now) {
        derivedStatus = "Available";
        if (unit.status !== "Available" && unit.status !== "available") {
          unit.status = "Available";
          unit.tenantId = null;
          await unit.save();
        }
      }

      getUnitWithLeaseStatus.push({
        ...unit.toObject(),
        hasLease: !!activeLease && activeLease.leaseEnd > now,
        status: derivedStatus,
        tenantName,
        lease: activeLease || null,
      });
    }

    let filteredUnits = status
      ? getUnitWithLeaseStatus.filter((u) => u.status?.toLowerCase() === status.toLowerCase())
      : getUnitWithLeaseStatus;

    if (search) {
      filteredUnits = filteredUnits.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.address?.toLowerCase().includes(search.toLowerCase()) ||
          u.unitNumber?.toLowerCase().includes(search.toLowerCase()) ||
          u.tenantName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    const totalFiltered = filteredUnits.length;
    const paginatedUnits = filteredUnits.slice(skip, skip + limit);

    res.status(200).json({
      units: paginatedUnits,
      total: totalFiltered,
      page,
      totalPages: Math.ceil(totalFiltered / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserUnitLeasePayment = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
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

    const lease = await Lease.findOne({
      isActive: true,
      tenantId: user._id,
    });

    if (lease.leaseEnd && lease.leaseEnd < now) {
      return res.status(200).json({
        message: "Lease expired",
        lease: { ...lease.toObject(), status: "expired" },
      });
    }

    let simulatedPayments = [];
    if (lease && lease.isActive) {
      simulatedPayments = getSimulatedPayments(lease, new Date(now.getFullYear(), now.getMonth() + 1, 1));
    }

    let paymentMonthDb = await Payment.findOne({
      tenantId: _id,
      dueDate: { $gte: startOfMonth, $lte: endOfMonth },
    });

    let paymentMonth = null;
    let appliedLateFee = 0;

    if (paymentMonthDb) {
      paymentMonth = paymentMonthDb.toObject();
      appliedLateFee = paymentMonth.lateFee || 0;
      
      // If it's in DB but not paid, check if it's overdue
      if (paymentMonth.status !== "Paid" && paymentMonth.dueDate && lease?.lateFee) {
        const dueDate = new Date(paymentMonth.dueDate);
        const gracePeriod = new Date(dueDate);
        gracePeriod.setDate(gracePeriod.getDate() + (lease.lateFee.afterDays || 0));

        if (now > gracePeriod) {
          appliedLateFee = lease.lateFee.amount;
          if (paymentMonth.status === "Pending") {
            paymentMonth.status = "Overdue";
          }
        }
      }
    } else {
      paymentMonth = simulatedPayments.find(p => {
        const d = new Date(p.dueDate);
        return d >= startOfMonth && d <= endOfMonth;
      });

      if (paymentMonth && paymentMonth.dueDate && lease?.lateFee) {
        const dueDate = new Date(paymentMonth.dueDate);
        const gracePeriod = new Date(dueDate);
        gracePeriod.setDate(gracePeriod.getDate() + (lease.lateFee.afterDays || 0));

        if (now > gracePeriod) {
          appliedLateFee = lease.lateFee.amount;
          paymentMonth.status = "Overdue";
        }
      }
    }

    const unit = await Unit.findById(user.unitId);

    let totalAmount = paymentMonth ? paymentMonth.amount + appliedLateFee : 0;

    const payment = paymentMonth ? {
      ...paymentMonth,
      lateFee: appliedLateFee,
      totalAmount,
    } : null;

    res.status(200).json({ unit, lease, payment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserUnitAndLease = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();
    const lease = await Lease.findOne({
      isActive: true,
      tenantId: user._id,
      unitId: user.unitId,
    });

    if (lease.leaseEnd && lease.leaseEnd < now) {
      return res.status(200).json({
        message: "Lease expired",
        lease: { ...lease.toObject(), status: "expired" },
      });
    }

    const unit = await Unit.findById(user.unitId);

    res.status(200).json({ unit, lease });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserUnitAndUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const unit = await Unit.findOne({ tenantId: id });
    if (!unit) {
      return res.status(400).json({ message: "Unit didn't exist" });
    }

    const landlord = await User.findById(unit.landlordId);
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
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const units = await Unit.find({ landlordId: _id });

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

    const activeLeases = await Lease.find({ landlordId: _id, isActive: true });

    let paymentMonth = [];
    for (const lease of activeLeases) {
      let paymentMonthDb = await Payment.findOne({
        leaseId: lease._id,
        dueDate: { $gte: startOfMonth, $lte: endOfMonth },
      });

      if (paymentMonthDb) {
        paymentMonth.push(paymentMonthDb.toObject());
      } else {
        const simulatedPayments = getSimulatedPayments(lease, new Date(now.getFullYear(), now.getMonth() + 1, 1));
        const currentMonthPayment = simulatedPayments.find(p => {
          const d = new Date(p.dueDate);
          return d >= startOfMonth && d <= endOfMonth;
        });
        if (currentMonthPayment) {
          paymentMonth.push(currentMonthPayment);
        }
      }
    }

    res.status(200).json({ units, paymentMonth });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordDashboardSummary = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const units = await Unit.find({ landlordId: _id });
    const totalUnits = units.length;
    const totalOccupiedUnits = units.filter(u => u.status === "Occupied").length;
    const totalAvailableUnits = units.filter(u => u.status === "Available").length;

    const percentageTotalOccupied = totalUnits > 0 ? (totalOccupiedUnits / totalUnits) * 100 : 0;
    const percentageTotalAvailable = totalUnits > 0 ? (totalAvailableUnits / totalUnits) * 100 : 0;

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

    const activeLeases = await Lease.find({ landlordId: _id, isActive: true });

    let totalMonthRent = 0;
    let totalUnitsInPayment = 0;

    for (const lease of activeLeases) {
      let paymentMonthDb = await Payment.findOne({
        leaseId: lease._id,
        dueDate: { $gte: startOfMonth, $lte: endOfMonth },
      });

      if (paymentMonthDb) {
        totalMonthRent += paymentMonthDb.amount;
        totalUnitsInPayment += 1;
      } else {
        const simulatedPayments = getSimulatedPayments(lease, new Date(now.getFullYear(), now.getMonth() + 1, 1));
        const currentMonthPayment = simulatedPayments.find(p => {
          const d = new Date(p.dueDate);
          return d >= startOfMonth && d <= endOfMonth;
        });
        if (currentMonthPayment) {
          totalMonthRent += currentMonthPayment.amount;
          totalUnitsInPayment += 1;
        }
      }
    }

    res.status(200).json({
      totalUnits,
      totalOccupiedUnits,
      totalAvailableUnits,
      percentageTotalOccupied,
      percentageTotalAvailable,
      totalMonthRent,
      totalUnitsInPayment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTotalLastMonthUnits = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
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
      landlordId: _id,
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
    const { _id } = req.user;
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

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    if (user.role === "tenant") {
      return res
        .status(400)
        .json({ message: "You don't have authorized to create unit" });
    }

    const newUnit = new Unit({
      landlordId: _id,
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
    const { id } = req.params;

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
  getUserUnitLeasePayment,
  getUserUnitAndLease,
  getUserUnitAndUserInfo,
  getLandlordUnits,
  getLandlordDashboardSummary,
  getTotalLastMonthUnits,
  getUnitWithLeaseStatus,
  getUnit,
  putUnit,
};
