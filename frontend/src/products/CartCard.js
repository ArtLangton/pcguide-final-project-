import React from 'react';
import { Link } from 'react-router-dom';

function CartCard({ item, deleteItem, updateQuantityHandler }) {
  const { product_id, name, price, quantity } = item;

  const handleDelete = () => {
    deleteItem(product_id);
  };

  const handleQuantityChange = (event) => {
    updateQuantityHandler(product_id, parseInt(event.target.value));
  };

  const imageUrl = `/images/products/id${16 + (product_id - 135)}.png`;

  return (
    <div className="cart-card">
      <img src={imageUrl} alt={name} />
      <div className="cart-card-info">
        <Link to={`/product/${product_id}`}>
          <h3>{name}</h3>
        </Link>
        <p>${price}</p>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
}

export default CartCard;
