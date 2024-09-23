import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); // Access the cart items from Redux store
  const dispatch = useDispatch(); // Get the dispatch function to send actions to Redux

  // Calculate the total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + calculateTotalCost(item), 0).toFixed(2);
  };

  // Handle the Continue Shopping button click
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the function passed from the parent component to continue shopping
  };

  // Increment the quantity of an item in the cart
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 })); // Dispatch the updateQuantity action
  };

  // Decrement the quantity of an item in the cart
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 })); // Decrement the quantity if greater than 1
    } else {
      dispatch(removeItem({ name: item.name })); // Remove the item from the cart if quantity reaches 0
    }
  };

  // Remove an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name })); // Dispatch the removeItem action to remove the item from the cart
  };

  // Calculate the total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Cost: {item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button 
          className="get-started-button1" 
          onClick={(e) => alert('Functionality to be added for future reference')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
