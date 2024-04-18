import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './admin/Login'
const Admin = () => {
    return (
        <Routes >
            <Route path='dask' element={<Login />} ></Route>
        </Routes>
    )
}

export default Admin