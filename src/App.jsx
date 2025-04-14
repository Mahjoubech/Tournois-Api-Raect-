import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import './App.css'

export default function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}
