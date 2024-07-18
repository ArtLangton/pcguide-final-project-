import React from "react";

function CartCard({ item, deleteItem }) {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    maxWidth: "300px",
    textAlign: "left",
    display: "flex",
    flexDirection: "row",
    marginBottom: "20px",
  };

  const contentStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  };

  const imgStyle = {
    maxWidth: "100px",
    height: "100px",
    objectFit: "contain",
    marginBottom: "10px",
  };

  const detailsStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const titleStyle = {
    fontSize: "1.2em",
    margin: "10px 0",
  };

  const priceStyle = {
    fontSize: "1em",
    margin: "10px 0",
  };

  const buttonStyle = {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "3px",
  };

  const linksStyle = {
    marginTop: "10px",
  };

  const linkStyle = {
    display: "block",
    color: "#007bff",
    textDecoration: "none",
    margin: "5px 0",
  };

  return (
    <div className="product-card" id={`cart-item-${item.item_id}`} style={cardStyle}>
      <div className="product-card-content" style={contentStyle}>
        <div className="product-card-details" style={detailsStyle}>
          <h3 className="product-card-title" style={titleStyle}>{item.name}</h3>
          <p className="product-card-price" style={priceStyle}>${item.price}</p>
          <button onClick={() => deleteItem(item.item_id)} className="product-card-button" style={buttonStyle}>Remove from wishlist</button>
        </div>
      </div>
      <div className="product-card-links" style={linksStyle}>
        {item.links && item.links.map((link, index) => (
          <a href={link} key={index} className="product-card-link" style={linkStyle}>{link}</a>
        ))}
      </div>
    </div>
  );
}

export default CartCard;
