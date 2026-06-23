import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({ path: [".env.local", ".env"] });

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import leaseRoutes from "./routes/leaseRoutes.js";
import inviteRoutes from "./routes/inviteRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";



mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB successfully!");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", unitRoutes);
app.use("/api", unitRoutes);
app.use("/api", leaseRoutes);
app.use("/api", inviteRoutes);
app.use("/api", maintenanceRoutes);
app.use("/api", paymentRoutes);
app.use("/api", receiptRoutes);
app.use("/api", notificationRoutes);
app.use("/api", documentRoutes);
