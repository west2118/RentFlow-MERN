import Invite from "../models/invite.model.js";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Unit from "../models/unit.model.js";
dotenv.config({ path: [".env.local", ".env"] });

const getUserInvite = async (req, res) => {
  try {
    const { id } = req.params;

    const invite = await Invite.findOne({
      unitId: id,
      expiresAt: { $gt: new Date() },
    });

    if (!invite) {
      return res.status(200).json("");
    }

    const inviteLink = `${req.protocol}://${req.get("host")}/signup?invite=${
      invite.token
    }`;

    res.status(200).json(inviteLink);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendInvite = async (req, res) => {
  try {
    const { uid } = req.user;
    const { gmail, unitId, tenantName } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const unit = await Unit.findById(unitId);
    if (unit.landlordUid.toString() !== uid.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have authorized in this post" });
    }

    const existingInvite = await Invite.findOne({
      unitId,
      expiresAt: { $gt: new Date() },
    });
    if (existingInvite) {
      return res.status(400).json({
        message: "An invite already exists. Please wait until it expires.",
      });
    }

    const token = uuidv4();
    await Invite.create({
      landlordUid: uid,
      tenantName,
      gmail,
      unitId,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    const inviteLink = `${req.protocol}://${req.get(
      "host"
    )}/signup?invite=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSKEY, // from Google App Passwords
      },
    });

    const mailOptions = {
      from: "RentFlow",
      to: gmail,
      subject: "You're invited to RentFlow",
      html: `
      <h3>Hello sir/madam ${tenantName}!</h3>
      <p>You’ve been invited to join RentFlow as a tenant.</p>
      <p>Click the link below to register:</p>
      <a href="${inviteLink}">${inviteLink}</a>
      <p>If you have already account just paste this token: ${token}</p>
      <p>This link will expire in 24 hours.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Invite sent via gmail!", inviteLink });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { sendInvite, getUserInvite };
