import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains { uid }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
