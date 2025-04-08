const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    // Lấy token từ header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Không có quyền truy cập' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tìm user từ id trong token
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Không có quyền truy cập' });
    }

    // Gán user vào request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Không có quyền truy cập' });
  }
};
