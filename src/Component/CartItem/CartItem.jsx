import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './CartItem.css'; // Updated CSS integration

const CartItem = () => {
  const { cartData, addToCart, removeFromCart, totalAmount } = useContext(ShopContext);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false); // New state for order confirmation
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOrderConfirmed(true); // Set order confirmed state when proceeding to checkout
    navigate('/checkout');
  };

  const continueShopping = () => {
    setIsOrderConfirmed(false); // Reset order confirmation state
  };

  return (
    <div>
      {isOrderConfirmed ? (
        <div className="order-confirmation">
          <h2>Order Confirmed!</h2>
          <p>Your order has been successfully placed.</p>
          <p>You can track your order <a href="#" className="track-order">here</a>.</p>
          <button className="continue-shopping" onClick={continueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {Object.entries(cartData).map(([itemId, quantity]) => (
              <div key={itemId} className="cart-item">
                <img src={`path_to_image/${itemId}.jpg`} alt="Product" className="product-image" />
                <div className="product-details">
                  <p><strong>Item ID: {itemId}</strong></p>
                  <p>Quantity: {quantity}</p>
                </div>
                <div className="cart-controls">
                  <button className="quantity-btn" onClick={() => removeFromCart(itemId)}>-</button>
                  <span className="quantity">{quantity}</span>
                  <button className="quantity-btn" onClick={() => addToCart(itemId)}>+</button>
                  <button className="remove-btn" onClick={() => removeFromCart(itemId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: ₹{totalAmount}</h3>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;



// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';
// import './CartItem.css';


// const CartItem = () => {
//   const { cartData, addToCart, removeFromCart, totalAmount } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     navigate('/checkout');
//   };

//   return (
//     <div className="cart-container">
//       <div className="cart-items">
//         {Object.entries(cartData).map(([itemId, quantity]) => (
//           <div key={itemId} className="cart-item">
//             <p>Item ID: {itemId}</p>
//             <p>Quantity: {quantity}</p>
//             <button onClick={() => addToCart(itemId)}>Add</button>
//             <button onClick={() => removeFromCart(itemId)}>Remove</button>
//           </div>
//         ))}
//       </div>
//       <div className="cart-summary">
//         <h3>Total Amount: ₹{totalAmount}</h3>
//         <button onClick={handleCheckout}>Proceed to Checkout</button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;