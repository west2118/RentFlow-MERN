import Lease from "../models/lease.model.js";
import Payment from "../models/payment.model.js";
import Receipt from "../models/receipt.model.js";
import User from "../models/user.model.js";
import { getSimulatedPayments } from "../utils/paymentGenerator.js";

const postReceipt = async (req, res) => {
  try {
    const { _id } = req.user;
    let {
      paymentId,
      fileUrl,
      transactionDate,
      notes,
      method,
      accountNumber,
      amountPaid,
      lateFee,
    } = req.body;

    console.log(req.body);

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    let payment;

    // Handle simulated payment IDs by inserting them into the database first
    if (paymentId && paymentId.startsWith("simulated-")) {
      const parts = paymentId.split("-");
      if (parts.length === 4) {
        const leaseId = parts[1];
        const year = parseInt(parts[2]);
        const month = parseInt(parts[3]);

        const lease = await Lease.findById(leaseId);
        if (lease) {
          const simulated = getSimulatedPayments(lease, new Date(year, month, 1));
          const simPayment = simulated.find(p => {
            const d = new Date(p.dueDate);
            return d.getFullYear() === year && d.getMonth() === month;
          });

          if (simPayment) {
            payment = new Payment({
              leaseId: simPayment.leaseId,
              unitId: simPayment.unitId,
              landlordId: simPayment.landlordId,
              tenantId: simPayment.tenantId,
              dueDate: simPayment.dueDate,
              amount: simPayment.amount,
              status: "In Process"
            });
            await payment.save();
            // Update paymentId so the receipt links to the real DB ID
            paymentId = payment._id.toString();
          }
        }
      }
    } else {
      payment = await Payment.findById(paymentId);
      if (payment) {
        payment.status = "In Process";
        await payment.save();
      }
    }

    if (!payment) {
      return res.status(400).json({ message: "Payment didn't exist" });
    }

    if (_id.toString() !== payment.tenantId.toString()) {
      return res.status(400).json({ message: "Don't have authorized in this" });
    }

    const lease = await Lease.findById(payment.leaseId);

    let appliedLateFee = 0;
    const now = new Date();

    if (lease?.lateFee && lease.lateFee.afterDays !== undefined) {
      const dueDate = new Date(payment.dueDate);
      const gracePeriod = new Date(dueDate);
      gracePeriod.setDate(gracePeriod.getDate() + lease.lateFee.afterDays);

      if (now > gracePeriod) {
        appliedLateFee = lease.lateFee.amount;
      }
    }

    const newReceipt = await Receipt.create({
      tenantId: payment.tenantId,
      landlordId: payment.landlordId,
      leaseId: payment.leaseId,
      paymentId,
      fileUrl,
      transactionDate,
      notes,
      accountNumber,
      amountPaid,
      method,
      lateFee: appliedLateFee,
    });

    res.status(200).json({
      message: "Payment receipt sent successfully!",
      newReceipt,
      updatedPayment: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getReceipt = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    // A simulated payment doesn't have a receipt yet
    if (id.startsWith("simulated-")) {
      return res.status(200).json(null);
    }

    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(400).json({ message: "Payment didn't exist" });
    }

    const receipt = await Receipt.findOne({
      paymentId: id,
      status: { $ne: "Rejected" },
    });

    res.status(200).json(receipt);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const acceptReceipt = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { lateFee } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const receipt = await Receipt.findById(id);
    if (!receipt) {
      return res.status(400).json({ message: "Receipt didn't exist" });
    }

    if (receipt.landlordId.toString() !== _id.toString()) {
      return res.status(400).json({ message: "Don't have authorized in this" });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(receipt.paymentId, {
      status: "Paid",
      datePaid: receipt.transactionDate,
      method: receipt.method,
      lateFee,
    });

    const updatedReceipt = await Receipt.findByIdAndUpdate(id, {
      status: "Accepted",
    });

    res.status(200).json({
      message: "Accepted receipt successfully!",
      updatedPayment,
      updatedReceipt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const rejectReceipt = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const receipt = await Receipt.findById(id);
    if (!receipt) {
      return res.status(400).json({ message: "Receipt didn't exist" });
    }

    if (receipt.landlordId.toString() !== _id.toString()) {
      return res.status(400).json({ message: "Don't have authorized in this" });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      receipt.paymentId,
      { status: "Pending" },
      { new: true }
    );

    const updatedReceipt = await Receipt.findByIdAndUpdate(id, {
      status: "Rejected",
    });

    res.status(200).json({
      message: "Declined receipt successfully!",
      updatedReceipt,
      updatedPayment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postReceipt, getReceipt, acceptReceipt, rejectReceipt };
