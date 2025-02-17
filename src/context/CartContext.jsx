import { createContext } from "react";


const CartContext = createContext();

export default  CartContext;

// context-қандай данный болатынын провайдерде/Provider жазамыз 



import { useState, useEffect } from "react";

import cartService  from "../services/cart.service";


export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);


    useEffect(() => {
        updateCart()
    }, [])



    function updateCart() {
        cartService
            .getCart()
            .then((response) => response.data)
            .then((data) => {
                setCart(data)
            })
            .catch((err) => setCart([]))
    }



    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
}
