import React, { useState } from 'react';
import { shop } from "./shopList.js";
import { Link } from "react-router-dom";
import './Shop.css'
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";



//CategoryCard - реализует отображение карточек
//  товаров с возможностью навигации по страницам.
const CategoryCard = () => {

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;


  // этот код для слайдер prev/next 
  const prevPage = () => {
    setPageIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const nextPage = () => {
    setPageIndex(prevIndex => Math.min(Math.ceil(shop.length / pageSize) - 1, prevIndex + 1));
  };


  // get  pages/products size 
  const renderProducts = () => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;


    return shop.slice(start, end).map(product => (

      <li key={product.id}>
        {/* this code for go to another page  */}
        <Link to={`/categories/${product.title}`}>
          <div>
             <p>{product.catalog}</p>
            <img src={product.images} alt={product.catalog} />
           <button> {product.button}  </button>
          </div>

          
        </Link>
      </li>
    ));
  };

  return (
    <div className="category-card">
      <h1 className=' text-5xl text-center font-semibold'>Интернет-магазин на Kaspi.kz</h1>

      <div className="pagination">
        <KeyboardArrowLeftIcon className='pagination-icon' onClick={prevPage} style={{ fontSize: "50px", cursor: "pointer" }} />

        <ul className='flex justify-evenly flex-wrap p-24'>
          {/* Если  вызовать renderProducts() вставляется в список ul, который отображает 
          карточки товаров текущей страницы. */}
          {renderProducts()}
        </ul>

        <KeyboardArrowRightIcon className='pagination-icon' onClick={nextPage} style={{ fontSize: "50px", cursor: "pointer" }} />
      </div>


    </div>
  );
};

export default CategoryCard;
