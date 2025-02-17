import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../App.css';
import ProductCard from './ProductCard';
import CartContext from '../context/CartContext';
import productService from "../services/product.service";

function Categories() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([]);
  const { cart } = useContext(CartContext);
  const cartItemCount = cart?.length;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("rating");

  // Загрузка продуктов из магазина при выборе категории
  useEffect(() => {
    if (category) {
      productService.getProductsByCategory(category)
        .then(res => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [category]);

  // Фильтрация и сортировка продуктов
  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    // Фильтрация по поисковому запросу
    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Фильтрация по ценовому диапазону
    if (priceRange.length) {
      const min = Math.min(...priceRange);
      const max = Math.max(...priceRange);
      filteredProducts = filteredProducts.filter(product =>
        product.price >= min && product.price <= max
      );
    }

    // Сортировка продуктов
    switch (sort) {
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "dsc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();

  // Обработчик изменения ценового диапазона
  const handlePriceChange = (e, min, max) => {
    if (e.target.checked) {
      setPriceRange(prev => [...prev, min, max]);
    } else {
      setPriceRange(prev => prev.filter(price => price !== min && price !== max));
    }
  };

  return (
    <div className='bg-white'>
      {/* Поиск продуктов */}
      <div className='ssss flex justify-center border-1 border-r-sky-100 items-center'>
        <p style={{ border: '1px solid rgb(199, 204, 204)', backgroundColor: 'whitesmoke', padding: '10px', margin: '0', color: 'rgb(44, 106, 207)' }}>Магазин</p>
        {error && <h1>{error}</h1>}
        <input
          style={{ backgroundColor: 'rgb(240, 246, 246)', border: '1px solid rgb(199, 204, 204)', padding: '10px', margin: '-5px', width: '450px' }}
          value={search}
          type="search"
          placeholder="Search product..."
          onChange={(e) => setSearch(e.target.value)}
          className="m-4"
        />

        {/* Кнопка корзины */}
        <Link to="/cart" className='relative top-1 left-11'>
          <ShoppingCartOutlinedIcon />
          {cartItemCount > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs absolute -top-1 -right-1 flex items-center justify-center">{cartItemCount}</span>}
        </Link>
      </div>

      {/* Ссылки на категории */}
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '27px 10px' }}>
        <Link to={`/categories/phone`}><p>ТЕЛЕФОНЫ И ГАДЖЕТЫ</p></Link>
        <Link to={`/categories/appliances`}><p>БЫТОВАЯ ТЕХНИКА</p></Link>
        <Link to={`/categories/gadget`}><p>ТВ, АУДИО, ВИДЕО</p></Link>
        <Link to={`/categories/computer`}><p>КОМПЬЮТЕРЫ</p></Link>
        <Link to={`/categories/furniture`}><p>МЕБЕЛЬ</p></Link>
        <Link to={`/categories/beauty`}><p>КРАСОТА, ЗДОРОВЬЕ</p></Link>
        <Link to={`/categories/children`}><p>ДЕТСКИЕ ТОВАРЫ</p></Link>
        <Link to={`/categories/pharmacy`}><p>АПТЕКА</p></Link>
      </div>

      {/* Сортировка и фильтрация */}
      <div>
        <div>
          <select style={{ border: '1px solid rgb(209, 209, 209)', position: 'absolute', top: '38%', left: '5%' }} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rating">Популярные</option>
            <option value="asc">Сначала дешевые</option>
            <option value="dsc">Сначала дорогие</option>
          </select>
        </div>

        <form action="/action_page.php" style={{ position: 'absolute', top: '54%', left: '5%' }}>
          <hr />
          <label htmlFor="price1">До 10 000 т</label><br />
          <input type="checkbox" id="price1" name="price1" onChange={(e) => handlePriceChange(e, 0, 9999)} />
          <br />

          <label htmlFor="price2">10 000 - 49 999 т</label><br />
          <input type="checkbox" id="price2" name="price2" onChange={(e) => handlePriceChange(e, 10000, 49999)} />
          <br />

          <label htmlFor="price3">50 000 - 99 999 т</label><br />
          <input type="checkbox" id="price3" name="price3" onChange={(e) => handlePriceChange(e, 50000, 99999)} />
          <br />

          <label htmlFor="price4">100 000 - 149 999 т</label><br />
          <input type="checkbox" id="price4" name="price4" onChange={(e) => handlePriceChange(e, 100000, 149999)} />
          <br />

          <label htmlFor="price5">150 000 - 199 999 т</label><br />
          <input type="checkbox" id="price5" name="price5" onChange={(e) => handlePriceChange(e, 150000, 199999)} />
          <br />

          <label htmlFor="price6">200 000 - 499 999 т</label><br />
          <input type="checkbox" id="price6" name="price6" onChange={(e) => handlePriceChange(e, 200000, 499999)} />
          <br />

          <label htmlFor="price7">Более 500 000 т</label><br />
          <input type="checkbox" id="price7" name="price7" onChange={(e) => handlePriceChange(e, 500000, Infinity)} />
          <hr />
        </form>
      </div>
      <br /><br /><br /><br /><br /><br /><br />


      

{/* Продуктс, продуктс айди функциялары арқылы 
продуктлерді алады, сұраныстарын қабылдап,
 керекті функцияларды шақырады */}

{/* Котроллер:  */}
{/* Барлық өнімді және айдимен алу арқылы json форматында қайтарады */}
{/* Және клиент сұранған өнімді алып визуализациялайды */}

      {/* Отображение продуктов */}
      {loading ? (
        <p className='text-center text-xl p-9'>Loading...</p>
      ) : filteredProducts.length > 0 ? (
        <div className='flex flex-wrap p-10 gap-11 ml-96'>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className='text-center text-xl p-9'>{search} не найден.</p>
      )}

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
}

export default Categories;
