import { Suspense } from "react"
import { Routes, Route } from "react-router"
import React from "react"


const AdminDashboard = React.lazy(()=> import("../pages/admin/AdminDashboard"));
const LeadManagement = React.lazy(()=> import("../pages/admin/LeadManagement"));
const UserManagement = React.lazy(()=> import("../pages/admin/UserManagement"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* <Route element={<PrivateRoutes />}> */}
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/lead-management" element={<LeadManagement/>} />
        <Route path="/admin/user-management" element={<UserManagement />} />
      {/* </Route> */}

    </Routes>
  </Suspense>
  )
}

export default AdminRoutes