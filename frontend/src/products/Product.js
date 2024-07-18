import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../authenticate/AuthContext';
import Loader from '../components/Loader';
import { checkCart, addToCart } from '../utils';

function Product() {
    const navigate = useNavigate();
    const { id } = useParams();
    const intId = parseInt(id);
    const { productsData, productsLoaded, isLoggedIn, userData } = useAuth();
    const [singleProductData, setSingleProductData] = useState(null);
    const [cartAdded, setCartAdded] = useState(false);

    useEffect(() => {
        if (productsLoaded) {
            const data = productsData.filter(item => item.product_id === intId);
            if (data.length > 0) {
                setSingleProductData(data[0]);
            } else {
                setSingleProductData(0);
            }
        }
    }, [productsLoaded, intId, productsData]);

    useEffect(() => {
        const checkCartStatus = async () => {
            if (isLoggedIn && singleProductData) {
                try {
                    const response = await checkCart(singleProductData.product_id, userData.user_id);
                    setCartAdded(response);
                } catch (err) {
                    console.log(err);
                }
            } else {
                setCartAdded(false);
            }
        };
        checkCartStatus();
    }, [isLoggedIn, singleProductData, userData]);

    const addToCartHandler = async () => {
        if (isLoggedIn) {
            try {
                const response = await addToCart(singleProductData.product_id, 1, userData.user_id);
                if (response === true) {
                    setCartAdded(true);
                } else {
                    console.log("failed to add to cart");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate('/login');
        }
    };

    if (singleProductData === null) {
        return <Loader />;
    }
    if (singleProductData === 0) {
        return <h1>Product does not exist</h1>;
    }
    const { product_id, description, name, price, category_name, attributes, brand, links } = singleProductData;

    const imageUrl = `/images/products/id${16 + (product_id - 135)}.png`;

    return (
        <div>
            <button className="btn-8 fixed-back-btn" onClick={() => navigate(-1)}>
                <span>Back</span>
            </button>
            <div id='product-page'>
                <section id='product-page-image'>
                    <img src={imageUrl} alt="product" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </section>

                <section id='product-page-info'>
                    <section id='top-section'>
                        <h1>{name}</h1>
                        <p>{category_name} - {brand}</p>
                    </section>

                    <section id='bottom-section'>
                        <p id='price'>${price}</p>
                        <p>{description}</p>
                    </section>

                    <section id='product-control'>
                        {
                            cartAdded ?
                                <button id="product-card-checkout-btn" onClick={() => navigate('/cart')}>PROCEED TO CHECKOUT</button>
                                :
                                <button className="button-37" onClick={addToCartHandler}>ADD TO CART</button>
                        }
                    </section>

                    <section id='product-content'>
                        <h3>Description</h3>
                        <p>{description}</p>
                    </section>

                    <section id='product-attributes'>
                        <h3>Attributes</h3>
                        <table>
                            <tbody>
                                {attributes && Object.keys(attributes).map((key, index) => (
                                    <tr key={index}>
                                        <td>{key}</td>
                                        <td>{attributes[key]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <section id='product-links'>
                        <h3>Where to buy</h3>
                        {links && links.sort((a, b) => {
                            const priceA = parseFloat(a.match(/\$(\d+\.\d+)/)[1]);
                            const priceB = parseFloat(b.match(/\$(\d+\.\d+)/)[1]);
                            return priceA - priceB;
                        }).map((link, index) => (
                            <p key={index}><a href={link.split(' ')[0]}>{link}</a></p>
                        ))}
                    </section>
                </section>
            </div>
        </div>
    );
}

export default Product;
