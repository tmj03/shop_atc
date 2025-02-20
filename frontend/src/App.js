import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/auth/Login';
import SignUp from './Component/auth/SignUp';
import AdminPage from './Component/admin/AdminPage';
import PrivateRoute from './Component/admin/PrivateRoute';
import ProductDetail from './Component/productMain/ProductDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route cho Trang Chủ */}
        <Route path="/" element={<Home />} />
        
        {/* Route cho Trang Chủ */}
        <Route path="/AdminPage" element={<PrivateRoute requiredRole="admin"><AdminPage /></PrivateRoute>} />

        {/* Route cho ProductDetail */}
        <Route path="/Product/:id" element={<ProductDetail />} />


        {/* Route cho Đăng Nhập */}
        <Route path="/login" element={<Login />} />
        
        {/* Route cho Đăng Ký */}
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
