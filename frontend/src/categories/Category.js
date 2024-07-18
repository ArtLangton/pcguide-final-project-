import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { useAuth } from "../authenticate/AuthContext";
import Loader from '../components/Loader';
import { getCategoryProducts, capitalizeFirstLetter } from "../utils";
import '../App.css'; // Ensure this import is present

function Category() {
    const { userData } = useAuth();
    const [productData, setProductData] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const { categoryName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Loading products for category:", categoryName);
        getCategoryProducts(capitalizeFirstLetter(categoryName)).then(response => {
            console.log("Products loaded for category:", categoryName, response);
            setProductData(response);
            setProductsLoaded(true);
        }).catch(err => {
            console.error("Error loading products for category:", categoryName, err);
        });

    }, [categoryName]);

    if (!productsLoaded) {
        return <Loader />
    }

    return (
        <div>
            <button className="btn-8" onClick={() => navigate('/')}>
                <span>Back</span>
            </button>
            <h1 id="category-heading">BEST SELLER {categoryName.toUpperCase()}</h1>
            <div id="product-cards">
                {
                    Array.isArray(productData) && productData.length > 0 ? (
                        productData.map(product => (
                            <ProductCard
                                product={product}
                                key={product.product_id}
                                imageIndex={product.product_id}
                                userData={userData}
                                style={{ maxWidth: '400px', maxHeight: '400px' }} // Add style for max size
                            />
                        ))
                    ) : (
                        <p>No products available in this category</p>
                    )
                }
            </div>
        </div>
    )
}

export default Category;
