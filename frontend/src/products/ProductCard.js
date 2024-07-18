import { useState, useEffect } from "react";
import { addToCart, checkCart } from "../utils";
import { useAuth } from "../authenticate/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

function ProductCard({ product, imageIndex, userData }) {
    const { category_name, description, name, price, product_id, brand } = product;
    
    const [quantity, setQuantity] = useState(1);
    const [cartAdded, setCartAdded] = useState(false);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    let user_id = userData ? userData.user_id : null;

    useEffect(() => {
        if (isLoggedIn && user_id) {
            checkCart(product_id, user_id).then(response => {
                setCartAdded(response === true);
            }).catch(err => {
                console.log(err);
            });
        } else {
            setCartAdded(false);
        }
    }, [isLoggedIn, product_id, user_id]);

    const addToCartHandler = async () => {
        if (isLoggedIn) {
            const response = await addToCart(product_id, quantity, user_id);
            if (response === true) {
                setCartAdded(true);
            }
        } else {
            navigate('/login');
        }
    }

    if (!category_name || !description || !name || !price || !product_id) {
        return null;
    }

    const imageUrl = `/images/products/id${16 + (product_id - 135)}.png`;

    return (
        <div id="product-card">
            <img src={imageUrl} alt="product" />
            <h4>{category_name.toUpperCase()} | {brand}</h4>
            <h3 onClick={() => navigate(`/product/${product_id}`)}>{name}</h3>
            <h5>${price}</h5>
            <p>{description}</p>

            {cartAdded ? (
                <Link to="/user"><button id="product-card-checkout-btn">GO TO MY WISHLIST</button></Link>
            ) : (
                <button id="product-card-btn" onClick={addToCartHandler}>TO WISHLIST</button>
            )}
        </div>
    );
}

export default ProductCard;
