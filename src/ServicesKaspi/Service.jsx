import React, {  useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Service.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { products } from "./data.js";
import { Autoplay } from 'swiper/modules';


// ProductCard  -- представляет карточку продукта. Он принимает параметры id, category, about, img и button,
//  которые используются для отображения информации о продукте.
const ProductCard = ({ id, category, about, img, button }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="product-card bg-white p-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative' }} >

      <h3 className="text-xl">{category}</h3>
      <p className="text-2xl">{about}</p>
      <button
        className="bg-sky-500"
        style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', padding: '10px 25px', borderRadius: '10px', opacity: isHovered ? 1 : 0 }}>
        {button}
      </button>
      <img
        src={img}
        alt={category}
        style={{ opacity: isHovered ? 0 : 1, alignItems: 'center', transition: 'opacity 0.3s ease' }} />
    </div>
  );
};






// ProductList  -- отображает список продуктов. Он принимает массив  products, 
// которое представляет массив объектов продуктов. Для каждого продукта из этого массива
//  создается слайд (SwiperSlide), внутри которого отображается ProductCard.
const ProductList = ({ products }) => {
  return (
    <div className="product-list flex  justify-evenly items-center ">
      {products.map(product => (
        <SwiperSlide>
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.category}
            about={product.about}
            img={product.img}
            button={product.button} />
        </SwiperSlide>
      ))}
    </div>
  );
};



// TuFunctions -- представляет собой главный компонент, который
//  использует Swiper для отображения списка продуктов в виде слайдера.  
const TuFunctions = () => {

  return (
    <div>
      <Swiper
        className="sample-slider"
        modules={[Autoplay]}  // прокрутка (Autoplay) чтобы автоматически перелистывать слайды. 
        loop={true}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        slidesPerView={4}  //cards size
        speed={9000}
      >
        {products.map(product => (
          <SwiperSlide>
            <ProductCard
              key={product.id}
              id={product.id}
              category={product.category}
              about={product.about}
              img={product.img}
              button={product.button} />
          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
};

export default TuFunctions;
