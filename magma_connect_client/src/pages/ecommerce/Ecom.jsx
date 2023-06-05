import React, { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";
import "./ecom.scss";

const Ecom = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

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
  }, []);


  
  // Handler for adding an item to the cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // If the item is already in the cart, update the quantity
      const updatedCartItems = cartItems.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });

      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setTotalValue(totalValue + product.price);
  };

  // Handler for removing an item from the cart
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    calculateTotalValue(updatedCartItems);
  };

  // Handler for clearing the entire cart
  const clearCart = () => {
    setCartItems([]);
    setTotalValue(0);
  };

  // Handler for changing the quantity of an item in the cart
  const changeQuantity = (itemId, quantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: quantity
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    calculateTotalValue(updatedCartItems);
  };

  // Handler for placing an order
  const placeOrder = () => {
    // Show alert box and confirm order placement
    const confirmed = window.confirm("Are you sure you want to proceed with the order?");
    
    if (confirmed) {
      // Send cart items to the backend
      axios.post("http://localhost:8800/api/auth/placeOrder", { cartItems })
        .then((res) => {
          console.log(res.data);
          // Handle successful order placement
        })
        .catch((err) => {
          console.log(err);
          // Handle error in order placement
        });

      // Clear the cart and total value
      setCartItems([]);
      setTotalValue(0);
    }
  };

  // Calculate the total value based on the cart items
  const calculateTotalValue = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalValue(total);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="cart">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - Quantity: 
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => changeQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                  />
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>Total Value: LKR {totalValue}</p>
            <button onClick={placeOrder}>Place Order</button>
            <button onClick={clearCart}>Clear All</button>
          </div>
        )}
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <div>
              <img src={product.imageurl} alt="" />
            </div>
            <p>Desc: {product.desc}</p>
            <p>Category: {product.category}</p>
            <p>Price: LKR {product.price}</p>
            <p>Stock Left: {product.quantity}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ecom;
