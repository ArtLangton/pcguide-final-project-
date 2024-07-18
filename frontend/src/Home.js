
import React from 'react';
import ProductCard from './products/ProductCard';

function Home() {
    return (
        <div>
            <div className="products">
                <ProductCard />
                {/* Other components can go here */}
            </div>
        </div>
    );
}

export default Home;
