import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSider from './components/admin-components/AdminSider';
import AdminPageContent from './components/page-contents/AdminPageContent';
import Navbar from './components/ui/Navbar';
import useAuthStore from './store/authState';
import Login from './pages/common/Login';
import Register from './pages/common/Register';


function App() {
  const authState = useAuthStore().authState

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          !authState.user ? (
            <Navigate to="/login" />
          ) : (
            <div className="flex flex-col w-full">
              <Navbar />
              <div className="flex flex-1">
                <AdminSider />
                <AdminPageContent />
              </div>
            </div>
          )
        }
      />
    </Routes>
  );
}

export default App;
