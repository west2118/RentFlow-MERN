import Payment from "../models/payment.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";

const getPaymentMonth = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    console.log(uid);

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

      let tenantName = null;

      if (payment?.tenantUid) {
        const tenant = await User.findOne({ uid: payment.tenantUid });
        tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : null;
      }

      getPaymentWithUserUnit.push({
        ...payment.toObject(),
        unitNumber: unit.unitNumber,
        tenantName,
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

    const paymentMonth = await Payment.findOne({
      tenantUid: uid,
      dueDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    const completedPayment = await Payment.find({
      tenantUid: uid,
      dueDate: {
        $lte: new Date(),
      },
    });

    res.status(200).json({ paymentMonth, completedPayment });
  } catch (error) {
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

    res.status(200).json(payment);
  } catch (error) {
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

export { getPaymentMonth, getTenantPayment, getPayment, getLatestPaymentUnits };
