import React , { useEffect, useState } from 'react';
import { carts } from './ProductsData';
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import productService from "../services/product.service";


//ProductsKaspi- создает карточку с изображением продукта, его категорией, названием и ссылкой.
const ProductsKaspi = ({ id, category, title, link, img }) => {
  return (
    <div className="w-1/2 p-3">


      <Link to={`/catalog/${id}`}>
        <div className=" carts_w   bg-white rounded-2xl p-8 shadow-md flex items-center">

          <div>
            <p className="text-gray-500 text-lg mb-2">{category}</p>
            <h2 className="text-2xl font-semibold mb-2 ">{title}</h2>
            <p className="text-blue-500 text-xl mb-2">{link}</p>
          </div>

          <div className="flex-shrink-0 mr-4">
            <img src={img} alt={title} className="w-24 h-24 rounded-md" />
          </div>
        </div>
      </Link>


    </div>
  );
};







// Этот компонент отображает список продуктов. Он принимает свойство carts, которое представляет массив объектов продуктов.
const KaspiList = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-center text-5xl font-semibold mb-8">Продукты Kaspi.kz</h1>
      {error && <h1>{error.message}</h1>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">



        {
        carts.map((product) => (


          <ProductsKaspi
            key={product.id}
            id={product.id}
            category={product.category}
            title={product.title}
            link={product.link}
            img={product.imgLink}
          />
        ))} 


      </div>
    </div>
  );
};

export default KaspiList;
