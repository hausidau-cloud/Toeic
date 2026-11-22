const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "toeic_secret_key";

// Xác thực token người dùng
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.",
    });
  }
};

// Kiểm tra quyền Admin
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({
      message: "Từ chối truy cập: Bạn không có quyền Quản trị viên (Admin). Người dùng chỉ có quyền học tập.",
    });
  }
  next();
};

// Xác thực tùy chọn (có token thì gắn vào req.user, không có thì bỏ qua)
exports.optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch {
      req.user = null;
    }
  }
  next();
};
