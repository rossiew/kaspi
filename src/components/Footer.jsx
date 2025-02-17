import React from 'react'
import '../App.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <footer >
      <br /><br /><br /><br /><br />
      <hr />
      <div className='  flex justify-evenly '>

        <div >
          <h1 className=' font-semibold text-xl '> Продукты Kaspi.kz</h1>

          <ul className=' text-gray-600 '>
            <li>Kaspi Gold</li>
            <li>Kaspi Gold для ребенка</li>
            <li>Kaspi Red</li>
  
          </ul>
        </div>



        <div>
          <h1 className=' font-semibold text-xl'>Сервисы Kaspi.kz</h1>
          <ul className=' text-gray-600 '>
            <li>Магазин</li>
            <li>Travel</li>
            <li>Платежи</li>
    
          </ul>
        </div>




        <div>
          <h1 className=' font-semibold text-xl '>Для Бизнеса</h1>
          <ul className=' text-gray-600 '>
            <li>Kaspi Pay</li>
            <li>Бизнес Кредит</li>
            <li>Кредит для ИП</li>
        
          </ul>
        </div>


        <div >
          <h1 className=' font-semibold  text-xl '>9999 Бесплатно с мобильного</h1>
          <ul className=' text-gray-600 '>
            <li>Пользовательское соглашение</li>
            <li>Вакансии</li>
            <li>Investor Relations</li>
        
          </ul>
        </div>
      </div>
      <hr />


      <div className='  flex  justify-between '>
        <div className='bank'>
          <h4>	© 2012-2024, АО «Kaspi Bank»</h4>

          <h3 className=' text-sm'>Лицензия на проведение банковских и иных операций и
            деятельности на рынке ценных<br /> бумаг №1.2.245/61 от 03.02.2020, выданная
            Агентством Республики Казахстан по<br /> регулированию и развитию финансового рынка</h3>

          <p className=' text-gray-600'>Корпоративный сайт</p>
        </div>

        <div className='icons text-gray-400'>
          <InstagramIcon />
          <span className="icon-space"/>
          <YouTubeIcon />
          <span className="icon-space"/>
          <TelegramIcon />
          <span className="icon-space"/>
          <FacebookIcon />
          <span className="icon-space"/>
          <XIcon />
          <span className="icon-space"/>
          <LinkedInIcon />
        </div>

      </div>
    </footer>
  )
}

export default Footer