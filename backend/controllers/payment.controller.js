import Lease from "../models/lease.model.js";
import Payment from "../models/payment.model.js";
import Receipt from "../models/receipt.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";
import { getSimulatedPayments } from "../utils/paymentGenerator.js";

const getPaymentMonth = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    const query = {
      landlordId: _id,
      dueDate: { $gte: startOfMonth, $lte: endOfMonth },
    };

    const activeLeases = await Lease.find({ landlordId: _id, isActive: true });
    
    const dbPayments = await Payment.find(query);
    
    let allPayments = [...dbPayments.map(p => p.toObject())];

    for (const lease of activeLeases) {
      const simulated = getSimulatedPayments(lease, new Date(now.getFullYear(), now.getMonth(), 1));
      const currentSim = simulated.find(p => {
        const d = new Date(p.dueDate);
        return d >= startOfMonth && d <= endOfMonth;
      });

      if (currentSim) {
        const existsInDb = allPayments.some(dbp => dbp.leaseId.toString() === lease._id.toString());
        if (!existsInDb) {
          allPayments.push(currentSim);
        }
      }
    }

    const enrichPayments = async (paymentsList) => {
      const enriched = [];

      for (const payment of paymentsList) {
        const unit = await Unit.findById(payment.unitId);
        const lease = await Lease.findById(payment.leaseId);
        
        let receipt = null;
        if (!payment._id.toString().startsWith("simulated-")) {
          receipt = await Receipt.findOne({
            paymentId: payment._id,
            status: { $ne: "Rejected" },
          });
        }

        let tenantName = null;

        if (payment?.tenantId) {
          const tenant = await User.findById(payment.tenantId);
          tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : null;
        }

        let appliedLateFee = payment.lateFee || 0;

        if (payment.status !== "Paid" && payment.dueDate && lease?.lateFee) {
          const dueDate = new Date(payment.dueDate);
          const gracePeriod = new Date(dueDate);
          gracePeriod.setDate(gracePeriod.getDate() + (lease.lateFee.afterDays || 0));

          if (now > gracePeriod) {
            appliedLateFee = lease.lateFee.amount;
          }

          if (!receipt) {
            payment.status = "Overdue";
          }
        } else if (!lease || !lease.lateFee) {
          if (!receipt && payment.status !== "Paid" && payment.dueDate) {
            payment.status = "Overdue";
          }
        }

        let totalAmount = payment.amount + appliedLateFee;

        enriched.push({
          ...payment,
          unitNumber: unit?.unitNumber || "Unknown",
          tenantName,
          lateFee: appliedLateFee,
          totalAmount,
        });
      }

      return enriched;
    };

    let allPaymentsEnriched = await enrichPayments(allPayments);

    if (search) {
      allPaymentsEnriched = allPaymentsEnriched.filter(
        (u) =>
          u.tenantName?.toLowerCase().includes(search.toLowerCase()) ||
          u.unitNumber?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status) {
      allPaymentsEnriched = allPaymentsEnriched.filter((u) => u.status === status);
    }

    const total = allPaymentsEnriched.length;
    const paginatedPayments = allPaymentsEnriched.slice(skip, skip + limit);

    res.status(200).json({
      payments: paginatedPayments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPaymentMonthSummary = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const query = {
      landlordId: _id,
      dueDate: { $gte: startOfMonth, $lte: endOfMonth },
    };

    const activeLeases = await Lease.find({ landlordId: _id, isActive: true });
    
    const dbPayments = await Payment.find(query);
    
    let allPayments = [...dbPayments.map(p => p.toObject())];

    for (const lease of activeLeases) {
      const simulated = getSimulatedPayments(lease, new Date(now.getFullYear(), now.getMonth(), 1));
      const currentSim = simulated.find(p => {
        const d = new Date(p.dueDate);
        return d >= startOfMonth && d <= endOfMonth;
      });

      if (currentSim) {
        const existsInDb = allPayments.some(dbp => dbp.leaseId.toString() === lease._id.toString());
        if (!existsInDb) {
          allPayments.push(currentSim);
        }
      }
    }

    const enrichPayments = async (paymentsList) => {
      const enriched = [];

      for (const payment of paymentsList) {
        const lease = await Lease.findById(payment.leaseId);
        
        let receipt = null;
        if (!payment._id.toString().startsWith("simulated-")) {
          receipt = await Receipt.findOne({
            paymentId: payment._id,
            status: { $ne: "Rejected" },
          });
        }

        let appliedLateFee = payment.lateFee || 0;

        if (payment.status !== "Paid" && payment.dueDate && lease?.lateFee) {
          const dueDate = new Date(payment.dueDate);
          const gracePeriod = new Date(dueDate);
          gracePeriod.setDate(gracePeriod.getDate() + (lease.lateFee.afterDays || 0));

          if (now > gracePeriod) {
            appliedLateFee = lease.lateFee.amount;
          }

          if (!receipt) {
            payment.status = "Overdue";
          }
        } else if (!lease || !lease.lateFee) {
          if (!receipt && payment.status !== "Paid" && payment.dueDate) {
            payment.status = "Overdue";
          }
        }

        let totalAmount = payment.amount + appliedLateFee;

        enriched.push({
          ...payment,
          lateFee: appliedLateFee,
          totalAmount,
        });
      }

      return enriched;
    };

    let allPaymentsEnriched = await enrichPayments(allPayments);

    const totalDue = allPaymentsEnriched.reduce((accu, curr) => accu + curr.amount, 0);
    const totalUnits = allPaymentsEnriched.length;

    const totalPaid = allPaymentsEnriched
      ?.filter((item) => item.status === "Paid")
      .reduce((accu, curr) => accu + curr.amount, 0);
    const totalRent = allPaymentsEnriched?.reduce((accu, curr) => accu + curr.amount, 0);

    const totalOverdue = allPaymentsEnriched
      ?.filter((item) => item.status === "Overdue")
      .reduce((accu, curr) => accu + curr.amount, 0);
    const totalUnitOverdue = allPaymentsEnriched?.filter((item) => item.status === "Overdue").length;

    res.status(200).json({
      totalDue,
      totalUnits,
      totalPaid,
      totalRent,
      totalOverdue,
      totalUnitOverdue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTenantPaymentSummary = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59, 999);

    const leaseActive = await Lease.findOne({ tenantId: _id, isActive: true });
    
    let simulatedPayments = [];
    if (leaseActive) {
      simulatedPayments = getSimulatedPayments(leaseActive, startOfNextMonth);
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
      if (paymentMonth.status !== "Paid" && paymentMonth.dueDate && leaseActive?.lateFee) {
        const dueDate = new Date(paymentMonth.dueDate);
        const gracePeriod = new Date(dueDate);
        gracePeriod.setDate(gracePeriod.getDate() + (leaseActive.lateFee.afterDays || 0));

        if (now > gracePeriod) {
          appliedLateFee = leaseActive.lateFee.amount;
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

      if (paymentMonth && paymentMonth.dueDate && leaseActive?.lateFee) {
        const dueDate = new Date(paymentMonth.dueDate);
        const gracePeriod = new Date(dueDate);
        gracePeriod.setDate(gracePeriod.getDate() + (leaseActive.lateFee.afterDays || 0));

        if (now > gracePeriod) {
          appliedLateFee = leaseActive.lateFee.amount;
          paymentMonth.status = "Overdue";
        }
      } else if (paymentMonth && (!leaseActive || !leaseActive.lateFee)) {
        if (paymentMonth.dueDate) {
          paymentMonth.status = "Overdue";
        }
      }
    }

    if (paymentMonth) {
      let totalAmount = paymentMonth.amount + appliedLateFee;
      paymentMonth = {
        ...paymentMonth,
        totalAmount,
        lateFee: appliedLateFee,
        receipt: null,
      };
    }

    let nextMonthPaymentDb = await Payment.findOne({
      tenantId: _id,
      dueDate: { $gte: startOfNextMonth, $lte: endOfNextMonth },
    });

    let nextMonthPayment = null;
    if (nextMonthPaymentDb) {
      nextMonthPayment = nextMonthPaymentDb.toObject();
    } else {
      nextMonthPayment = simulatedPayments.find(p => {
        const d = new Date(p.dueDate);
        return d >= startOfNextMonth && d <= endOfNextMonth;
      });
    }

    if (leaseActive?.leaseEnd && leaseActive.leaseEnd < now) {
      return res.status(200).json({
        lease: { ...(leaseActive.toObject ? leaseActive.toObject() : leaseActive), status: "expired" },
      });
    }

    return res.status(200).json({
      lease: leaseActive || null,
      paymentMonth: paymentMonth || null,
      nextMonthPayment: nextMonthPayment || null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTenantPaymentHistory = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    const query = { tenantId: _id };
    
    if (status && status !== "All") {
      query.status = status;
    }

    const dbCompletedPayment = await Payment.find(query).sort({ dueDate: -1 });

    let paymentHistory = [];

    for (const p of dbCompletedPayment) {
      let pReceipt = await Receipt.findOne({
        paymentId: p._id,
        status: { $ne: "Rejected" },
      }).select("method status");

      paymentHistory.push({
        ...p.toObject(),
        receipt: pReceipt ? pReceipt : null,
      });
    }

    if (search) {
      paymentHistory = paymentHistory.filter(
        (u) =>
          u.method?.toLowerCase().includes(search.toLowerCase()) ||
          u.amount?.toString().includes(search)
      );
    }

    const total = paymentHistory.length;
    const paginatedHistory = paymentHistory.slice(skip, skip + limit);

    return res.status(200).json({
      completedPayment: paginatedHistory,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    let paymentObj = null;

    if (id.startsWith("simulated-")) {
      const parts = id.split("-");
      // simulated-${leaseId}-${year}-${month}
      if (parts.length === 4) {
        const leaseId = parts[1];
        const year = parseInt(parts[2]);
        const month = parseInt(parts[3]);

        const lease = await Lease.findById(leaseId);
        if (lease) {
          const simulated = getSimulatedPayments(lease, new Date(year, month, 1));
          paymentObj = simulated.find(p => {
            const d = new Date(p.dueDate);
            return d.getFullYear() === year && d.getMonth() === month;
          });
        }
      }
    } else {
      const dbPayment = await Payment.findById(id);
      if (dbPayment) paymentObj = dbPayment.toObject();
    }

    if (!paymentObj) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const lease = await Lease.findById(paymentObj.leaseId);

    const now = new Date();
    let appliedLateFee = paymentObj.lateFee || 0;

    if (paymentObj.status !== "Paid" && paymentObj.dueDate && lease?.lateFee) {
      const dueDate = new Date(paymentObj.dueDate);
      const gracePeriod = new Date(dueDate);
      gracePeriod.setDate(gracePeriod.getDate() + (lease.lateFee.afterDays || 0));

      if (now > gracePeriod) {
        appliedLateFee = lease.lateFee.amount;
        paymentObj.status = "Overdue";
      }
    } else if (!lease || !lease.lateFee) {
      if (paymentObj.status !== "Paid" && paymentObj.dueDate) {
        paymentObj.status = "Overdue";
      }
    }

    let totalAmount = paymentObj.amount + appliedLateFee;

    const paymentMonth = {
      ...paymentObj,
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
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 7, 23, 59, 59, 999));

    const dbPayments = await Payment.find({
      landlordId: _id,
      dueDate: { $gte: start, $lte: end },
    });

    let allPayments = [...dbPayments.map(p => p.toObject())];
    
    // Supplement with simulated
    const activeLeases = await Lease.find({ landlordId: _id, isActive: true });
    for (const lease of activeLeases) {
      const simulated = getSimulatedPayments(lease, new Date(now.getFullYear(), now.getMonth() + 1, 1));
      const inRangeSim = simulated.filter(p => {
        const d = new Date(p.dueDate);
        return d >= start && d <= end;
      });

      for (const sim of inRangeSim) {
        const exists = allPayments.some(dbp => dbp.leaseId.toString() === lease._id.toString() && new Date(dbp.dueDate).getTime() === new Date(sim.dueDate).getTime());
        if (!exists) {
          allPayments.push(sim);
        }
      }
    }

    allPayments.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    allPayments = allPayments.slice(0, 3);

    const getPaymentWithUserUnitLatest = [];

    for (const payment of allPayments) {
      const unit = await Unit.findById(payment.unitId);

      let tenantName = null;
      if (payment?.tenantId) {
        const tenant = await User.findById(payment.tenantId);
        tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : null;
      }

      getPaymentWithUserUnitLatest.push({
        ...payment,
        unitNumber: unit?.unitNumber || "Unknown",
        tenantName,
      });
    }

    res.status(200).json(getPaymentWithUserUnitLatest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordPaymentHistorySummary = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();

    const query = {
      landlordId: _id,
      dueDate: { $lte: now },
    };

    const activeLeases = await Lease.find({ landlordId: _id, isActive: true });
    
    const dbPayments = await Payment.find(query);
    let allPayments = [...dbPayments.map(p => p.toObject())];

    for (const lease of activeLeases) {
      const simulated = getSimulatedPayments(lease, new Date(now.getFullYear(), now.getMonth(), 1));
      const pastSimulated = simulated.filter(p => new Date(p.dueDate) <= now);
      
      for (const sim of pastSimulated) {
        const exists = allPayments.some(dbp => dbp.leaseId.toString() === lease._id.toString() && new Date(dbp.dueDate).getTime() === new Date(sim.dueDate).getTime());
        if (!exists) {
          allPayments.push(sim);
        }
      }
    }

    const enrichPayments = async (paymentsList) => {
      const enriched = [];
      for (const payment of paymentsList) {
        const lease = await Lease.findById(payment.leaseId);
        
        let receipt = null;
        if (!payment._id.toString().startsWith("simulated-")) {
          receipt = await Receipt.findOne({
            paymentId: payment._id,
            status: "Accepted",
          }).select("method");
        }

        let appliedLateFee = payment.lateFee || 0;

        if (payment.status !== "Paid" && payment.dueDate && lease?.lateFee) {
          const dueDate = new Date(payment.dueDate);
          const gracePeriod = new Date(dueDate);
          gracePeriod.setDate(gracePeriod.getDate() + (lease.lateFee.afterDays || 0));

          if (now > gracePeriod) {
            appliedLateFee = lease.lateFee.amount;
            payment.status = "Overdue";
          }
        } else if (!lease || !lease.lateFee) {
          if (payment.status !== "Paid" && payment.dueDate) {
            payment.status = "Overdue";
          }
        }

        let totalAmount = payment.amount + appliedLateFee;

        enriched.push({
          ...payment,
          lateFee: appliedLateFee,
          totalAmount,
        });
      }
      return enriched;
    };

    let allPaymentsEnriched = await enrichPayments(allPayments);

    const totalCollectedAndPayments = (targetStatus) => {
      const filtered = allPaymentsEnriched.filter(payment => payment.status === targetStatus);
      // Ensure we don't double count late fees on Paid just like we fixed earlier, or we can use curr.amount.
      // Wait, earlier we used curr.amount for summary cards!
      const totalAmount = filtered?.reduce((accu, curr) => accu + curr.amount, 0);
      return {
        totalAmount,
        totalLength: filtered.length,
      };
    };

    const totalPending = totalCollectedAndPayments("Pending");
    const totalPaid = totalCollectedAndPayments("Paid");
    const totalOverdue = totalCollectedAndPayments("Overdue");

    const totalDue = {
      totalAmount: allPaymentsEnriched.reduce((accu, curr) => accu + curr.amount, 0),
      totalLength: allPaymentsEnriched.length,
    };

    res.status(200).json({
      totalDue,
      totalPending,
      totalPaid,
      totalOverdue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordPayments = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const now = new Date();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    const query = {
      landlordId: _id,
      dueDate: { $lte: now },
    };

    const activeLeases = await Lease.find({ landlordId: _id, isActive: true });
    
    const dbPayments = await Payment.find(query);
    let allPayments = [...dbPayments.map(p => p.toObject())];

    for (const lease of activeLeases) {
      const simulated = getSimulatedPayments(lease, new Date(now.getFullYear(), now.getMonth(), 1));
      const pastSimulated = simulated.filter(p => new Date(p.dueDate) <= now);
      
      for (const sim of pastSimulated) {
        const exists = allPayments.some(dbp => dbp.leaseId.toString() === lease._id.toString() && new Date(dbp.dueDate).getTime() === new Date(sim.dueDate).getTime());
        if (!exists) {
          allPayments.push(sim);
        }
      }
    }

    allPayments.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

    const enrichPayments = async (paymentsList) => {
      const enriched = [];
      for (const payment of paymentsList) {
        const unit = await Unit.findById(payment.unitId);
        const lease = await Lease.findById(payment.leaseId);
        
        let receipt = null;
        if (!payment._id.toString().startsWith("simulated-")) {
          receipt = await Receipt.findOne({
            paymentId: payment._id,
            status: "Accepted",
          }).select("method");
        }

        let tenantName = null;
        if (payment?.tenantId) {
          const tenant = await User.findById(payment.tenantId);
          tenantName = tenant ? `${tenant.firstName} ${tenant?.lastName}` : null;
        }

        let appliedLateFee = payment.lateFee || 0;

        if (payment.status !== "Paid" && payment.dueDate && lease?.lateFee) {
          const dueDate = new Date(payment.dueDate);
          const gracePeriod = new Date(dueDate);
          gracePeriod.setDate(gracePeriod.getDate() + (lease.lateFee.afterDays || 0));

          if (now > gracePeriod) {
            appliedLateFee = lease.lateFee.amount;
            payment.status = "Overdue";
          }
        } else if (!lease || !lease.lateFee) {
          if (payment.status !== "Paid" && payment.dueDate) {
            payment.status = "Overdue";
          }
        }

        let totalAmount = payment.amount + appliedLateFee;

        enriched.push({
          ...payment,
          unitNumber: unit?.unitNumber || "Unknown",
          tenantName,
          lateFee: appliedLateFee,
          totalAmount,
          receipt,
        });
      }
      return enriched;
    };

    let allPaymentsEnriched = await enrichPayments(allPayments);

    if (search) {
      allPaymentsEnriched = allPaymentsEnriched.filter(
        (u) =>
          u.tenantName?.toLowerCase().includes(search.toLowerCase()) ||
          u.unitNumber?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status) {
      allPaymentsEnriched = allPaymentsEnriched.filter((u) => u.status === status);
    }

    const total = allPaymentsEnriched.length;
    const paginatedPayments = allPaymentsEnriched.slice(skip, skip + limit);

    res.status(200).json({
      payments: paginatedPayments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getPaymentMonth,
  getTenantPaymentSummary,
  getTenantPaymentHistory,
  getPayment,
  getLatestPaymentUnits,
  getLandlordPayments,
  getPaymentMonthSummary,
  getLandlordPaymentHistorySummary,
};
