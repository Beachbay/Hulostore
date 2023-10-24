function Checkout() {
  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <p className="checkout-title">CHECKOUT</p>

        <div className="payment-methods">
          <h3>PAYMENT METHODS</h3>
          <div className="payment-btns">
            <button className="payment-btn">
              <img
                id="swish"
                src="./SwishLogoSecondaryLight-BG.png"
                alt="Swish"
              />
            </button>
            <button className="payment-btn">
              <img id="MC" src="./mc_symbol_opt_45_3x.png" alt="MasterCard" />
            </button>
          </div>
        </div>

        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              className="input-big"
              type="text"
              id="firstName"
              placeholder=" Sven"
              name="firstName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="input-big"
              type="text"
              id="lastName"
              placeholder=" Svensson"
              name="lastName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              className="input-big"
              type="text"
              id="address"
              placeholder=" Malmögatan 4"
              name="address"
            />
          </div>
          <div className="checkout-small">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                className="input-small"
                type="text"
                id="city"
                placeholder=" Malmö"
                name="city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip</label>
              <input
                className="input-small"
                type="text"
                id="zip"
                placeholder=" 123 45"
                name="zip"
              />
            </div>
          </div>
        </form>

        <hr className="divider" />

        <div className="total-price">
          <h4>Total Cost</h4>
          <h4>$</h4>
        </div>

        <button id="checkout-btn">CHECK OUT</button>
      </div>
    </div>
  );
}

export default Checkout;
