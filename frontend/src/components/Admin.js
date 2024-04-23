import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './admin/Login'
import NewUserLogin from './admin/NewUserLogin'
import AdminPanel from './admin/AdminPanel'
const Admin = () => {
    return (
        <Routes>
            <Route path="/">
                <Route path='/' element={<Login />}></Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='new-login' element={<NewUserLogin />}></Route>
                <Route path="/*" element={<AdminPanel />}></Route>
            </Route>
        </Routes >
    )
}

export default Admin