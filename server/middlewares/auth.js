import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.status(401).json({ success: false, message: "Access denied" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default userAuth;
