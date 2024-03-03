/* eslint-disable */
import React from 'react';
import Dashboard from './Screens/Dashboard';
import LoginComponent from './Screens/Login';
import { Route, Routes } from 'react-router-dom';
import AddFile from './Screens/AddFile';
import FileDetail from './Screens/FileDetail';
import FileDetailUser from './Screens/FileDetail_user';
import QrDetail from './Screens/QRAuthentication';
import UserProvider from './context';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AddFile" element={<AddFile />} />
        <Route path="/FileView" element={<FileDetail />} />
        <Route path="/FileView/:id" element={<FileDetail />} />
        <Route path="/FileView/qr/:id" element={<FileDetailUser />} />
        {/* Updated route with the correct parameter placeholder */}
        <Route path="/Qrdetail/id/:id" element={<QrDetail />} />
      </Routes>
    </UserProvider>
  );
}
