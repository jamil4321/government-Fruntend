import React from 'react';
import Dashboard from './Screens/Dashboard';
import LoginComponent from './Screens/Login';
import { Route, Routes } from 'react-router-dom';
import AddFile from './Screens/AddFile';
import FileDetail from './Screens/FileDetail';
import QrDetail from './Screens/QRAuthentication';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/AddFile" element={<AddFile />} />
      <Route path="/FileView" element={<FileDetail />} />
      {/* Updated route with the correct parameter placeholder */}
      <Route path="/Qrdetail/id/:id" element={<QrDetail />} />
    </Routes>
  );
}
