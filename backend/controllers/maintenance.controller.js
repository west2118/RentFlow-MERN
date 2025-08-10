import Maintenance from "../models/maintenance.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

const postMaintenanceRequest = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      issueType,
      requestName,
      urgencyLevel,
      description,
      photo,
      tenantName,
    } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const unit = await Unit.findById(user.unitId);
    if (!unit) {
      return res.status(400).json({ message: "Unit didn't exist" });
    }

    if (user.uid.toString() !== unit.tenantUid.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have authorized in this unit" });
    }

    const newMaintenance = await Maintenance.create({
      issueType,
      requestName,
      urgencyLevel,
      description,
      photo,
      unitId: user.unitId,
      tenantUid: user.uid,
      landlordUid: unit.landlordUid,
      tenantName,
      unitNumber: unit.unitNumber,
    });

    res
      .status(200)
      .json({ message: "Maintenance requested successfully!", newMaintenance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTenantMaintenance = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const maintenances = await Maintenance.find({ tenantUid: uid });

    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordMaintenance = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const maintenances = await Maintenance.find({ landlordUid: uid });

    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const markAsInProgress = async (req, res) => {
  try {
    const { uid } = req.user;
    const { techNotes, tenantName, maintenanceId, tenantUid, status, message } =
      req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const tenant = await User.findOne({ uid: tenantUid });
    if (!tenant) {
      return res.status(400).json({ message: "Tenant didn't exist" });
    }

    const maintenance = await Maintenance.findById(maintenanceId);
    if (!maintenance) {
      return res.status(400).json({ message: "Maintenance didn't exist" });
    }

    if (maintenance.landlordUid.toString() !== uid.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have authorized in this " });
    }

    let updatedMaintenance;

    if (status === "Completed") {
      updatedMaintenance = await Maintenance.findByIdAndUpdate(
        maintenanceId,
        { status, techNotes },
        { new: true }
      );
    } else {
      updatedMaintenance = await Maintenance.findByIdAndUpdate(
        maintenanceId,
        { status },
        { new: true }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSKEY, // from Google App Passwords
      },
    });

    const mailOptions = {
      from: "RentFlow",
      to: tenant.email,
      subject: "Maintenance Update from RentFlow",
      html: `
        <h3>Hello ${tenantName},</h3>
        <p>The maintenance request for your unit is currently <strong>In Progress</strong>.</p>
        <p>${message}</p>
        <br/>
        <p>Thank you,</p>
        <p><strong>RentFlow Team</strong></p>
        `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Maintenance updated successfully!",
      updatedMaintenance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordMaintenanceDashboard = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const maintenances = await Maintenance.find({ landlordUid: uid })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMaintenance = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const maintenance = await Maintenance.findById(id);

    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const putMaintenance = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const maintenance = await Maintenance.findById(id);
    if (!maintenance) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    if (uid.toString() !== maintenance.tenantUid.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have authorized in this" });
    }

    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Updated maintenance successfully!",
      updatedMaintenance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  postMaintenanceRequest,
  getTenantMaintenance,
  getLandlordMaintenance,
  getLandlordMaintenanceDashboard,
  markAsInProgress,
  getMaintenance,
  putMaintenance,
};
