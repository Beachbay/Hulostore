import { useEffect, useState } from "react";
import CartCard from "../CartCard";
import Checkout from "../Chekout";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  totalPrice: number;
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  useEffect(() => {
    const price = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setTotalPrice(price);
  }, [cartItems]);

  console.log(totalPrice);
  const saveCartToLocalStorage = (updatedCartItems: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const removeItem = (product: CartItem) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    saveCartToLocalStorage(updatedCartItems);
    setCartItems(updatedCartItems);
  };

  const increaseItem = (product: CartItem) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.id === product.id
    );

    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity++;
      saveCartToLocalStorage(updatedCartItems);
      setCartItems(updatedCartItems);
    }
  };

  const decreaseItem = (product: CartItem) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (item) => item.id === product.id
    );

    if (itemIndex !== -1 && updatedCartItems[itemIndex].quantity > 1) {
      updatedCartItems[itemIndex].quantity--;
      saveCartToLocalStorage(updatedCartItems);
      setCartItems(updatedCartItems);
    }
  };

  return (
    <div className="cart-container bg-[#FCF5ED] text-[#1F1717]">
      <div className="cart-items">
        {cartItems.map((item) => {
          const { id, title, price } = item;
          return (
            <CartCard
              key={id}
              name={title}
              quantity={item.quantity}
              price={Math.floor(price * item.quantity)}
              removeItem={() => removeItem(item)}
              increaseItem={() => increaseItem(item)}
              decreaseItem={() => decreaseItem(item)}
            />
          );
        })}
      </div>

      <div className="checkout-container">
        <Checkout totalPrice={Math.floor(totalPrice)} />
      </div>
    </div>
  );
}

export default Cart;
