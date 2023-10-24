import { useEffect, useState } from "react";
import CartCard from "../CartCard";
import Checkout from "../Chekout";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        // Parse the stored data and make sure it's an array
        const parsedCart: CartItem[] = JSON.parse(storedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error("Error parsing cart data from local storage:", error);
      }
    }
  }, []);

  const removeItem = (product: Product) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product.id !== product.id
    );

    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const increaseItem = (product: Product) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity++;
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    }
  };

  const decreaseItem = (product: Product) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (itemIndex !== -1 && updatedCartItems[itemIndex].quantity > 1) {
      updatedCartItems[itemIndex].quantity--;
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartCard
            key={item.product.id}
            name={item.product.title}
            price={Math.floor(item.product.price * item.quantity)}
            quantity={item.quantity}
            removeItem={() => removeItem(item.product)}
            increaseItem={() => increaseItem(item.product)}
            decreaseItem={() => decreaseItem(item.product)}
          />
        ))}
      </div>
      <div className="checkout-container">
        <Checkout />
      </div>
    </div>
  );
}

export default Cart;
