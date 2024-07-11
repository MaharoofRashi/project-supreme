import { Suspense } from "react"
import { Routes, Route } from "react-router"
import React from "react"


const Login = React.lazy(()=> import("../pages/common/Login"));


const CommonRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* <Route element={<PrivateRoutes />}> */}
        <Route path="/login" element={<Login/>} />
      {/* </Route> */}

    </Routes>
  </Suspense>
  )
}

export default CommonRoutes