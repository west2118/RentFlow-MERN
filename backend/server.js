import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import admin from "firebase-admin";
import { createRequire } from "module";
import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

const app = express();
app.use(cors());
app.use(express.json());

import userRoutes from "./routes/userRoutes.js";

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://newtasks-196cb-default-rtdb.firebaseio.com",
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB successfully!");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
  });
});

app.use("/api", userRoutes);
