import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Header />
     

      <Outlet />  {/*header мен footer  арасындағы элементтер өзгеріп отыру үшін қойлады */}


     
    </div>
  )
}

export default Layout