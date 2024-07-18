import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Motherboards', img: '/images/motherboards.png' },
  { name: 'CPU', img: '/images/cpu.png' },
  { name: 'Graphics Cards (GPU)', img: '/images/graphiccards.png' },
  { name: 'SSD', img: '/images/ssd.png' },
  { name: 'Hard drives (HDD)', img: '/images/hdd.png' },
  { name: 'RAM', img: '/images/ram.png' },
  { name: 'Computer cooling', img: '/images/computercooling.png' },
  { name: 'Sound cards', img: '/images/soundcards.png' },
  { name: 'PSU', img: '/images/psu.png' },
  { name: 'Computer cases', img: '/images/computercases.png' },
  { name: 'Accessories', img: '/images/accessories.png' }
];

function ShopByCategory() {
  return (
    <div>
      <h2 id='category-heading'>START WITH A CATEGORY</h2>
      <div id='category-container'>
        <div id="category-list">
          {categories.map((category, index) => (
            <Link to={`/category/${category.name.replace(/\s+/g, '')}`} id='link' key={index}>
              <div className="category-item">
                <img src={category.img} alt={category.name} />
                <h3>{category.name.toUpperCase()}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopByCategory;
