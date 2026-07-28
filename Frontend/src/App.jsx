import React from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes.jsx"
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  )
}

export default App
