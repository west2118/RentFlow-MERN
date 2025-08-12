import Lease from "../models/lease.model.js";
import Payment from "../models/payment.model.js";
import Receipt from "../models/receipt.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";

const getPaymentMonth = async (req, res) => {
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

    const payments = await Payment.find({
      landlordUid: uid,
      dueDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    const getPaymentWithUserUnit = [];

    for (const payment of payments) {
      const unit = await Unit.findById(payment.unitId);
      const lease = await Lease.findById(payment.leaseId);
      const receipt = await Receipt.findOne({
        paymentId: payment._id,
        status: { $ne: "Rejected" },
      });

      let tenantName = null;

      if (payment?.tenantUid) {
        const tenant = await User.findOne({ uid: payment.tenantUid });
        tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : null;
      }

      let totalAmount = payment.amount;
      let appliedLateFee = payment.lateFee;

      if (payment.status !== "Paid" && payment.dueDate) {
        const dueDate = new Date(payment.dueDate);
        const gracePeriod = new Date(dueDate);
        gracePeriod.setDate(gracePeriod.getDate() + lease.lateFee.afterDays);

        if (now > gracePeriod) {
          appliedLateFee = lease.lateFee.amount;
          totalAmount += appliedLateFee;
        }

        if (!receipt) {
          payment.status = "Overdue";
        }
      }

      getPaymentWithUserUnit.push({
        ...payment.toObject(),
        unitNumber: unit.unitNumber,
        tenantName,
        lateFee: appliedLateFee,
        totalAmount,
      });
    }

    res.status(200).json(getPaymentWithUserUnit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTenantPayment = async (req, res) => {
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

    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const endOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 2, // +2 because month index is zero-based
      0, // day 0 means the last day of the *previous* month (which is next month here)
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

    const nextMonthPayment = await Payment.findOne({
      tenantUid: uid,
      dueDate: {
        $gte: startOfNextMonth,
        $lte: endOfNextMonth,
      },
    });

    const lease = await Lease.findById(paymentMonth.leaseId);
    const receipt = await Receipt.findOne({
      paymentId: paymentMonth._id,
      status: { $ne: "Rejected" },
    }).select("method status");

    let totalAmount = paymentMonth.amount;
    let appliedLateFee = paymentMonth.lateFee;

    if (paymentMonth.status !== "Paid" && paymentMonth.dueDate) {
      const dueDate = new Date(paymentMonth.dueDate);
      const gracePeriod = new Date(dueDate);
      gracePeriod.setDate(gracePeriod.getDate() + lease.lateFee.afterDays);

      if (now > gracePeriod) {
        appliedLateFee = lease.lateFee.amount;
        totalAmount += appliedLateFee;
      }

      if (!receipt) {
        paymentMonth.status = "Overdue";
      }
    }

    const payment = {
      ...paymentMonth.toObject(),
      totalAmount,
      lateFee: appliedLateFee,
      receipt: receipt ? receipt : null,
    };

    const completedPayment = await Payment.find({
      tenantUid: uid,
      dueDate: {
        $lte: new Date(),
      },
    }).sort({ dueDate: -1 });

    let paymentHistory = [];

    for (const payment of completedPayment) {
      const lease = await Lease.findById(payment.leaseId);
      const receipt = await Receipt.findOne({
        paymentId: payment._id,
        status: { $ne: "Rejected" },
      }).select("method status");

      let totalAmount = payment.amount;
      let appliedLateFee = payment.lateFee;

      if (payment.status !== "Paid" && payment.dueDate) {
        const dueDate = new Date(payment.dueDate);
        const gracePeriod = new Date(dueDate);
        gracePeriod.setDate(gracePeriod.getDate() + lease.lateFee.afterDays);

        if (now > gracePeriod) {
          appliedLateFee = lease.lateFee.amount;
          totalAmount += appliedLateFee;
        }

        if (!receipt) {
          payment.status = "Overdue";
        }
      }

      paymentHistory.push({
        ...payment.toObject(),
        totalAmount,
        lateFee: appliedLateFee,
        receipt: receipt ? receipt : null,
      });
    }

    res.status(200).json({
      paymentMonth: payment,
      completedPayment: paymentHistory,
      nextMonthPayment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const lease = await Lease.findById(payment.leaseId);

    const now = new Date();
    let totalAmount = payment.amount;
    let appliedLateFee = payment.lateFee;

    if (payment.status !== "Paid" && payment.dueDate) {
      const dueDate = new Date(payment.dueDate);
      const gracePeriod = new Date(dueDate);
      gracePeriod.setDate(gracePeriod.getDate() + lease.lateFee.afterDays);

      if (now > gracePeriod) {
        appliedLateFee = lease.lateFee.amount;
        totalAmount += appliedLateFee;
        payment.status = "Overdue";
      }
    }

    const paymentMonth = {
      ...payment.toObject(),
      totalAmount,
      lateFee: appliedLateFee,
    };

    res.status(200).json(paymentMonth);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLatestPaymentUnits = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();
    const start = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );

    const end = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 7,
        23,
        59,
        59,
        999
      )
    );

    const payments = await Payment.find({
      dueDate: {
        $gte: start,
        $lte: end,
      },
    })
      .sort({ dueDate: -1 })
      .limit(3);

    const getPaymentWithUserUnitLatest = [];

    for (const payment of payments) {
      const unit = await Unit.findById(payment.unitId);

      let tenantName = null;

      if (payment?.tenantUid) {
        const tenant = await User.findOne({ uid: payment.tenantUid });
        tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : null;
      }

      getPaymentWithUserUnitLatest.push({
        ...payment.toObject(),
        unitNumber: unit.unitNumber,
        tenantName,
      });
    }

    res.status(200).json(getPaymentWithUserUnitLatest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordPayments = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();

    const payments = await Payment.find({
      landlordUid: uid,
      dueDate: {
        $lte: now,
      },
    });

    const getPaymentWithUserUnit = [];

    for (const payment of payments) {
      const unit = await Unit.findById(payment.unitId);
      const lease = await Lease.findById(payment.leaseId);
      const receipt = await Receipt.findOne({
        paymentId: payment._id,
        status: "Accepted",
      }).select("method");

      let tenantName = null;

      if (payment?.tenantUid) {
        const tenant = await User.findOne({ uid: payment.tenantUid });
        tenantName = tenant ? `${tenant.firstName} ${tenant?.lastName}` : null;
      }

      let totalAmount = payment.amount;
      let appliedLateFee = payment.lateFee;

      if (payment.status !== "Paid" && payment.dueDate) {
        const dueDate = new Date(payment.dueDate);
        const gracePeriod = new Date(dueDate);
        gracePeriod.setDate(gracePeriod.getDate() + lease.lateFee.afterDays);

        if (now > gracePeriod) {
          appliedLateFee = lease.lateFee.afterDays;
          totalAmount += appliedLateFee;
          payment.status = "Overdue";
        }
      }

      getPaymentWithUserUnit.push({
        ...payment.toObject(),
        unitNumber: unit.unitNumber,
        tenantName,
        lateFee: appliedLateFee,
        totalAmount,
        receipt,
      });
    }

    res.status(200).json(getPaymentWithUserUnit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getPaymentMonth,
  getTenantPayment,
  getPayment,
  getLatestPaymentUnits,
  getLandlordPayments,
};
