import "./listProduct.scss";
import axios from "axios";


import React, { useState, useContext } from 'react'

export const ListProduct = () => {
  const [inputs, setInputs] =useState({
    name: "",
    category: "",
    description: "",
  });


  const resetInputs = () => {
    setInputs({
      name: "",
      category: "",
      description: "",
    });
  };
 

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/listproduct", inputs);
      resetInputs();
    
    } catch (err) {
     
    }
  };





  return (
    <div class="form-wrapper">
  <h2>Add New Product or Service</h2>
  <form>
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div class="form-group">
      <label for="category">Category:</label>
      <select id="category" name="category">
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="beauty">Beauty</option>
        <option value="home">Home</option>
      </select>
    </div>
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea id="description" name="description" rows="5" required></textarea>
    </div>
    <button type="submit">Add Product/Service</button>
  </form>
</div>

  )
}


