import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  decreaseItem: (name: string) => void;
  increaseItem: (name: string) => void;
  removeItem: (name: string) => void;
}

function CartCard(item: CartItem) {
  return (
    <div className="cart-card">
      <div className="left">
        <img
          id="cartCard-img"
          src="/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg"
          alt="Product Image"
        />
        <h3 className="product-name">{item.name}</h3>
      </div>
      <div className="count">
        <button
          className="decrement"
          onClick={() => item.decreaseItem(item.name)}
        >
          -
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button
          className="increment"
          onClick={() => item.increaseItem(item.name)}
        >
          +
        </button>
      </div>
      <div className="cart-details">
        <p className="product-price">{item.price}$</p>
        <FontAwesomeIcon
          id="delete-btn"
          icon={faTrashCan}
          onClick={() => item.removeItem(item.name)}
        />
      </div>
    </div>
  );
}

export default CartCard;
