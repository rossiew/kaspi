import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Bussines from './pages/Bussines'
import Clients from './pages/Clients'
import Gidd from './pages/Gidd'
import Categories from './ShopKaspi/Categories'
import ProductCategory from './ProductsKaspi/ProductCategory'
import KaspiList from './ProductsKaspi/ProductsKaspi'
import Cart from './ShopKaspi/Cart'
import { shop } from './ShopKaspi/shopList'
import UserProvider from './context/UserProvider'
import LoginForm from './registr/Login'
import RegistrationForm from './registr/Registration_Form'
import LogoutForm from './registr/Logout'
import { CartProvider } from './context/CartContext'
// управление навигацией между различными страницами приложения с использованием роутинга и 
// отображение соответствующих компонентов при совпадении URL-адресов
function App() {
  return (
    <>
      <div className='App'>
        <CartProvider>
        <UserProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/clients' element={<Clients />} />
              <Route path='/buss' element={<Bussines />} />
              <Route path='/gid' element={<Gidd />} />
              <Route path='/categories/:category' element={<Categories />} />
              <Route path='/catalog/:id' element={<ProductCategory />} />{/* QUERY PARAMETER   */}
              <Route path='/products' element={<KaspiList />} />
              <Route path="/cart" element={<Cart shop={shop} />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<RegistrationForm />} />  
              <Route path='/logout' element={<LogoutForm />} />
            </Route>
          </Routes>
        </UserProvider>
        </CartProvider>
      </div>
    </>
  )
}

export default App
