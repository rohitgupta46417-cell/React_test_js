import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AddProduct from './components/AddProduct'
import ShowProduct from './components/ShowProduct'
import EditProduct from './components/EditProduct'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<AddProduct />} />
      <Route path='/show/:id' element={<ShowProduct />} />
      <Route path='/edit/:id' element={<EditProduct />} />
    </Routes>
  </BrowserRouter>
)

export default App
