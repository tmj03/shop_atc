const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("🛠️ Kiểm tra headers:", req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("⛔ Không có token hoặc định dạng sai!");
        return res.status(401).json({ message: "Vui lòng đăng nhập." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token hợp lệ, user:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("⛔ Token không hợp lệ!");
        return res.status(401).json({ message: "Phiên đăng nhập không hợp lệ." });
    }
};
