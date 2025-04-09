// service thực hiện yêu cầu API call đến backend
// frontend/src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Đăng ký người dùng mới
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đăng nhập người dùng
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin người dùng hiện tại
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đăng xuất
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
