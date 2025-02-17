import React from 'react'
import './Home.css'
import ProductList from '../ServicesKaspi/Service';
import Shop from '../ShopKaspi/Shop';
import ProductsKaspi from '../ProductsKaspi/ProductsKaspi';
import Footer from '../components/Footer';



function Home() {
  return (
    <div>
    <div className=' flex justify-around p-12'>
      <div className='main'>
        <img src='https://kaspi.kz/img/main_logo.svg' />
      </div>
  <div className=' w-80'>
          <img src='https://kaspi.kz/img/new-phone-3x-n.png'/>
        </div>
      

  </div>
        <div className='services   text-center'>
          <h1 className=' text-5xl  font-semibold mb-9'>Сервисы Kaspi.kz</h1>
        </div>

      


      <div className='service m-10'>
        <ProductList />

      </div>


      <div className='shop'>
        <Shop />
      </div>


      <ProductsKaspi />


      <br /><br />




      <div className='qr_passw text-center flex flex-col items-center p-32'>
        <h1 className='text-5xl font-semibold mb-4'>Сканируйте, чтобы перейти в приложение Kaspi.kz</h1>
        <img className='rounded-2xl mb-4' src='https://kaspi.kz/img/qr-main-v2.svg' width={400} style={{ padding: '20px' }} />
      </div>



      <br />


      <Footer />
    </div>
  )
}

export default Home;