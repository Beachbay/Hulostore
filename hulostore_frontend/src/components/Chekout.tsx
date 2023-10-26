import React, { useState } from "react";

interface CheckoutProps {
  totalPrice: number;
}

const Checkout: React.FC<CheckoutProps> = (props) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    city: "",
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [successNotification, setSuccessNotification] = useState<string | null>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const allInputsFilled = Object.values(formValues).every(
      (value) => value.trim() !== ""
    );

    if (!allInputsFilled) {
      setNotification("Please enter all fields");
    } else if (props.totalPrice === 0) {
      setNotification("Please add items to your cart.");
    } else {
      setSuccessNotification("Thank you for your purchase!");
      setTimeout(() => {
        window.location.href = "/";
        localStorage.clear();
      }, 2000);
    }
  };

  return (
    <div className="checkout-box bg-[#F4BF96] text-[#ffffff]">
      <p className="checkout-title">CHECKOUT</p>

      {notification && (
        <div className="bg-red-500 text-white p-2 rounded-md mb-4">
          {notification}
        </div>
      )}

      {successNotification && (
        <div className="bg-green-500 text-white p-2 rounded-md mb-4">
          {successNotification}
        </div>
      )}

      <div className="payment-methods text-[#ffffff]">
        <h3>PAYMENT METHODS</h3>
        <div className="payment-btns">
          <button className="payment-btn bg-[#d39d74] hover:opacity-80">
            <img
              id="swish"
              src="./SwishLogoSecondaryLight-BG.png"
              alt="Swish"
            />
          </button>
          <button className="payment-btn bg-[#d39d74] hover:opacity-80">
            <img id="MC" src="./mc_symbol_opt_45_3x.png" alt="MasterCard" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group text-[#ffffff]">
          <label htmlFor="firstName">First Name</label>
          <input
            className="input-big bg-[#d39d74]"
            type="text"
            id="firstName"
            placeholder=" Sven"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="input-big bg-[#d39d74]"
            type="text"
            id="lastName"
            placeholder=" Svensson"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Street Address</label>
          <input
            className="input-big bg-[#d39d74]"
            type="text"
            id="address"
            placeholder=" Malmögatan 4"
            name="address"
            value={formValues.address}
            onChange={handleChange}
          />
        </div>
        <div className="checkout-small">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              className="input-small bg-[#d39d74]"
              type="text"
              id="city"
              placeholder=" Malmö"
              name="city"
              value={formValues.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip</label>
            <input
              className="input-small bg-[#d39d74]"
              type="text"
              id="zip"
              placeholder=" 123 45"
              name="zip"
              value={formValues.zip}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="hover:opacity-80" id="checkout-btn">
          CHECK OUT
        </button>
      </form>

      <hr className="divider" />

      <div className="total-price font-bold">
        <h4>Total Cost</h4>
        <h4>{props.totalPrice} $</h4>
      </div>
    </div>
  );
};

export default Checkout;
