import React, {useContext, useState} from 'react'
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import cartService from '../services/cart.service';
import CartContext from '../context/CartContext';

export default function ProductCard({product}) {
    const {updateCart } = useContext(CartContext)
    const addToCart = (e) => {
        e.target.disabled = true;
        cartService
        .addProduct(product.id)
        .then(res => {setInCart(true)
            updateCart()
        })
        .catch(err => alert(err.message))
      };

      const [inCart, setInCart] = useState(product.inCart);
    
  return (
    <li key={product.id} className='list-none'>
    <img className='max-w-40 max-h-40 rounded-xl items-center px-2 py-2' src={product.images[0]} alt={product.title} />
    <hr/>
    {product.title}
    <br />
    <br />
    <ul>
      <li ><p className=' text-x text-gray-400 italic'>Цена</p>
        <p className=' italic'>{product.price}₸</p>  </li>
    </ul>

    {/* Добавление в корзину */}
    <button className={inCart ? 'items-start clicked' : 'items-start'} disabled={inCart} onClick={addToCart}  >
      <FavoriteBorderTwoToneIcon />
    </button>
  </li>
  )
}
