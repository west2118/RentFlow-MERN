import Document from "../models/document.model.js";
import Unit from "../models/unit.model.js";
import User from "../models/user.model.js";

const getTenantDocuments = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search;
    const status = req.query.status;

    const query = {
      tenantUid: uid,
    };
    if (search) {
      query.$or = [
        { tenantFullName: { $regex: search, $options: "i" } },
        { tenantUid: { $regex: search, $options: "i" } },
        { unitNumber: { $regex: search, $options: "i" } },
        { "documents.name": { $regex: search, $options: "i" } },
      ];
    }

    const total = await Document.countDocuments(query);
    const documents = await Document.find(query).skip(skip).limit(limit);

    let filteredDocuments = status
      ? documents.filter((s) => s.category === status)
      : documents;

    res.status(200).json({
      documents: filteredDocuments,
      total: filteredDocuments.length,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLandlordDocuments = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search;
    const status = req.query.status;

    const query = {
      landlordUid: uid,
    };
    if (search) {
      query.$or = [
        { tenantFullName: { $regex: search, $options: "i" } },
        { tenantUid: { $regex: search, $options: "i" } },
        { unitNumber: { $regex: search, $options: "i" } },
        { "documents.name": { $regex: search, $options: "i" } },
      ];
    }

    const total = await Document.countDocuments(query);
    const documents = await Document.find(query).skip(skip).limit(limit);

    let filteredDocuments = status
      ? documents.filter((s) => s.category === status)
      : documents;

    res.status(200).json({
      documents: filteredDocuments,
      total: filteredDocuments.length,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const postDocument = async (req, res) => {
  try {
    const { uid } = req.user;
    const { tenantUid, category, documents } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const unit = await Unit.findOne({ tenantUid });
    if (!unit) {
      return res.status(400).json({ message: "Unit didn't exist" });
    }

    const tenant = await User.findOne({ uid: tenantUid });
    if (!tenant) {
      return res.status(400).json({ message: "Tenant didn't exist" });
    }

    const tenantFullName = `${tenant.firstName} ${tenant.lastName}`;

    const createDocs = await Promise.all(
      documents.map((doc) =>
        Document.create({
          landlordUid: uid,
          tenantUid,
          tenantFullName,
          category,
          documents: [doc], // wrap single file inside array
          unitNumber: unit.unitNumber,
        })
      )
    );

    res
      .status(200)
      .json({ message: "Document uploaded successfully!", createDocs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postDocument, getLandlordDocuments, getTenantDocuments };
