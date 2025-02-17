import API from "../api/axios.config"

class CartService {
    addProduct(id) {
      return API.post(`/cart/${id}`);
    }
    getCart() {
      return API.get(`/cart`);
    }

    removeProduct(id) {
      return API.delete(`/cart/${id}`);
    }

    updateQuantity(id, quantity) {
      return API.put(`/cart/${id}`, { quantity });
    }

    clearCart() {
        return API.delete(`/cart`);
    }
  }
  
  export default new CartService();