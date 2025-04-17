import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Create from './pages/Tournois/Create';
import CreateMatch from './pages/Matches/CreateMatch';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';
import Home from './pages/Home';
import './App.css';
import CreatePlayer from './pages/Players/CreatePlayer';
import CreateScore  from './pages/Score/CreateScore';

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
            <Route path="/createMatch" element={user ?  <CreateMatch /> : <Login />} />
            <Route path="/createScore" element={user ?  <CreateScore /> : <Login />} />
            <Route path="/createPlayer" element={user ?  <CreatePlayer /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}