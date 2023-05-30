import React, { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";
import "./ecom.scss";
// import { navBar } from "";
const Ecom = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  // Sample product data
  // const products = [
  //   { id: 1, name: 'Product 1', price: 10 },
  //   { id: 2, name: 'Product 2', price: 20 },
  //   { id: 3, name: 'Product 3', price: 30 },
  // ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/auth/getProducts");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
    
  }, [])


  // Handler for adding an item to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product">
          <h3>{product.name}</h3>
          <p>Desc: ${product.desc}</p>
          <p>Category: ${product.category}</p>
          <div>
            <img src={product.imageurl} alt="" />
          </div>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
  )
}

export default Ecom