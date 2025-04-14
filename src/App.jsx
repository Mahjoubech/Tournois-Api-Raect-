import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import './App.css'

export default function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}
