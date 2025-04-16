import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
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
            <Route path="Register" element={user ?  <Home /> : <Register />} />
            <Route path="Login" element={user ?  <Home /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}