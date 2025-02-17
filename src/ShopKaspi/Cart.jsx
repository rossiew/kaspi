// Корзина іші: 

// Пост сұранысын қабылдайды,  и addToCart функциясы шақырылады. 

// Ол өнімнің айдиін и санын алады
// Юзердің сессиясынан корзинаны алады
// Продукт бар жоғын тексереді және қосып/азайтады санын
// Корзинаны сессияда сақтайды
// Егер сәтті болса хабарлама келеді.


import React, { useContext, useEffect, useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './Cart.css';
import CartContext from '../context/CartContext';
import cartService from '../services/cart.service';

function Cart() {
  const { cart, updateCart } = useContext(CartContext);
  const [productsPrice, setProductsPrice] = useState(0);
  const [cartSize, setCartSize] = useState(cart.length);
  const [displayCart, setDisplayCart] = useState(true);

  // State for order form
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState('');

  const handleButtonClick = () => {
    setShowAddressInput(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Вы успешно оформили заказ по адресу: ${address}`);
    setAddress('');
  };

  useEffect(() => {
    calculatePrices(cart);
    setCartSize(cart.length);
  }, [cart]);

  const calculatePrices = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setProductsPrice(total);
  };

  const removeProduct = (product) => {
    cartService
      .removeProduct(product.id)
      .then(() => updateCart())
      .catch((err) => alert(err.message));
  };

  const increaseQuantity = (product) => {
    cartService
      .updateQuantity(product.id, product.quantity + 1)
      .then(() => updateCart())
      .catch((err) => alert(err.message));
  };

  const decreaseQuantity = (product) => {
    cartService
      .updateQuantity(product.id, product.quantity - 1)
      .then(() => updateCart())
      .catch((err) => alert(err.message));
  };

  const clearCart = () => {
    cartService
      .clearCart()
      .then(() => updateCart())
      .catch((err) => alert(err.message));
  };

  const getPrice = (price) => {
    let priceStr = String(price);
    if (priceStr.length > 4) {
      const priceSlices = [];
      for (let i = priceStr.length - 3; i >= 0; i -= 3) {
        priceSlices.unshift(priceStr.slice(i > 0 ? i : 0, i + 3));   //UNSHIFT-алдынан қосу
        priceStr = priceStr.slice(0, i);
      }
      priceSlices.unshift(priceStr);
      priceStr = priceSlices.join(" ");
    }
    return priceStr + " ₸";
  };

  const toggleDisplayCart = () => {
    setDisplayCart((prev) => !prev);
  };

  return (
    <div className="cart-left">
      <div className="cart-items-top">
        <h2>Корзина: <span id="cart-size">{cartSize}</span></h2>
        <button id="clear-cart" onClick={clearCart}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
      <br />
      <div id="display-cart">
        <h2 className='text-2xl'>Товары :</h2>
        <button className='bth' onClick={toggleDisplayCart}>
          {displayCart ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </button>
      </div>
      <div className={"cart-items " + (displayCart ? "" : "hidden")}>
        <br />
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <div className="cart-item-left">
              <img src={product.images} alt="" />
              <div className="cart-item-left-actions">
                <p>{product.title}</p>
                <div className="cart-item-amount">
                  <button onClick={() => decreaseQuantity(product)}>
                    {product.quantity > 1 ? <RemoveOutlinedIcon /> : <DeleteOutlineOutlinedIcon />}
                  </button>
                  <p>{product.quantity}</p>
                  <button onClick={() => increaseQuantity(product)}>
                    <AddCircleOutlineOutlinedIcon />
                  </button>
                </div>
              </div>
            </div>
            <div className="cart-item-right">
              <button onClick={() => removeProduct(product)}><CloseOutlinedIcon /></button>
              <p>{getPrice(product.price * product.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="cart-total">
        <h3 className='total-price'>Общая сумма: {getPrice(productsPrice)}</h3>
      </div>
      <div className='ff'>
        {!showAddressInput && (
          <button className='gg' onClick={handleButtonClick}>Перейти к оформлению</button>
        )}
        {showAddressInput && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="orderInfo">Введите ваш адрес :</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button className='gg' type="submit">Оформить заказ</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Cart;
