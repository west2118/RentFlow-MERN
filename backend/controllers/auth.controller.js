import User from "../models/user.model.js";
import Invite from "../models/invite.model.js";
import Lease from "../models/lease.model.js";
import Unit from "../models/unit.model.js";
import Payment from "../models/payment.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokens, setCookies } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, inviteToken } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const _id = newUser._id;
    let inviteObj = null;

    if (inviteToken) {
      const invite = await Invite.findOne({
        token: inviteToken,
        used: false,
      });

      if (!invite || invite.isActive === false || invite.expiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired invite." });
      }

      newUser.unitId = invite.unitId;
      newUser.role = "tenant";
      inviteObj = invite;
    } else {
      newUser.role = "landlord";
    }

    const { accessToken, refreshToken } = generateTokens(_id);
    newUser.refreshToken = refreshToken;

    await newUser.save();

    if (inviteObj) {
      const updatedLease = await Lease.findOneAndUpdate(
        { unitId: inviteObj.unitId, isActive: true },
        { tenantId: _id },
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

    setCookies(res, accessToken, refreshToken);

    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: userResponse,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Password not set for this user (Migrated from Firebase)." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, accessToken, refreshToken);

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    res.status(200).json({
      message: "Logged in successfully",
      accessToken,
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      const user = await User.findOne({ refreshToken });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided." });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        user.refreshToken = null;
        await user.save();
        return res.status(403).json({ message: "Invalid or expired refresh token." });
      }

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      setCookies(res, accessToken, refreshToken);

      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshToken;

      res.status(200).json({
        accessToken,
        user: userResponse,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
