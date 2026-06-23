import User from "../models/user.model.js";
import Invite from "../models/invite.model.js";
import Lease from "../models/lease.model.js";
import Unit from "../models/unit.model.js";
import Payment from "../models/payment.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const generateTokens = (uid) => {
  const accessToken = jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, inviteToken } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const uid = uuidv4();

    let unitId = null;

    if (inviteToken) {
      const invite = await Invite.findOne({
        token: inviteToken,
        used: false,
      });

      if (!invite || invite.isActive === false || invite.expiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired invite." });
      }

      unitId = invite.unitId;

      const updatedLease = await Lease.findOneAndUpdate(
        { unitId: invite.unitId, isActive: true },
        { tenantUid: uid },
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
        { unitId: invite.unitId, leaseId: updatedLease?._id },
        { tenantUid: uid }
      );

      invite.used = true;
      await invite.save();
    }

    const { accessToken, refreshToken } = generateTokens(uid);

    const newUser = new User({
      uid,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      refreshToken,
      unitId,
    });

    await newUser.save();

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: {
        uid,
        firstName,
        lastName,
        email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
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

    const { accessToken, refreshToken } = generateTokens(user.uid);

    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: "Logged in successfully",
      accessToken,
      user: {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
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

      const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.uid);

      user.refreshToken = newRefreshToken;
      await user.save();

      setCookies(res, accessToken, newRefreshToken);

      res.status(200).json({
        accessToken,
        user: {
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
