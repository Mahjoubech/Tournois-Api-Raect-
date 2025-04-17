import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Create from './pages/Tournois/Create';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';
import Home from './pages/Home';
import './App.css';

export default function App() {
  const {user} = useContext(AppContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={user ?  <Home /> : <Register />} />
            <Route path="/login" element={user ?  <Home /> : <Login />} />
            <Route path="/create" element={user ?  <Create /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}