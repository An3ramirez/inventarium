import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Spin } from 'antd';

import MainLayout from '../layout/mainLayout';

// Importa los containers
const LoginContainer = lazy(() => import('./login/loginContainer'));
const CompanyContainer = lazy(() => import('./company/containers/companyContainer'));
const InventoryContainer = lazy(() => import('./inventory/containers/inventoryContainer'));

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Si hay un token, el usuario está autenticado
      setAuthenticated(true);
    }
  }, []);

  return (
    <div className="app">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={
              authenticated ? (
                <Navigate to="/company-list" replace />
              ) : (
                <Suspense fallback={<Spin size='large'/>}><LoginContainer /></Suspense>
              )              
            } />
            <Route element={<MainLayout><Outlet /></MainLayout>}>
              <Route path="/company-list" element={<Suspense fallback={<Spin size='large'/>}><CompanyContainer /></Suspense>} />
              <Route path="/inventory-list" element={<Suspense fallback={<Spin size='large'/>}><InventoryContainer /></Suspense>} />
              <Route path="*" element={<Navigate to="/sign-in" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;