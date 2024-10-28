import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import AdminHome from './components/AdminHome.jsx';
import ManageRooms from './components/ManageRooms.jsx';
import ManageUsers from './components/ManageUsers.jsx';
import ManageBookings from './components/ManageBookings.jsx';
import History from './components/History.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />} errorElement={<ErrorPage />} >
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route
        path='home'
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path='admin-home'
        element={
          <ProtectedRoutes >
            <AdminHome />
          </ProtectedRoutes>
        }
      />
      <Route
        path='manage-rooms'
        element={
          <ProtectedRoutes>
            <ManageRooms />
          </ProtectedRoutes>
        }
      />
      <Route
        path='manage-users'
        element={
          <ProtectedRoutes>
            <ManageUsers />
          </ProtectedRoutes>
        }
      />
      <Route
        path='manage-bookings'
        element={
          <ProtectedRoutes>
            <ManageBookings />
          </ProtectedRoutes>
        }
      />
      <Route
        path='history'
        element={
          <ProtectedRoutes>
            <History />
          </ProtectedRoutes>
        }
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
