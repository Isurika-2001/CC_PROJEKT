import './addproduct.scss'
import vgvideo from '../../assets/backgroundvideo.mp4'

import React, { useState } from 'react';

export const AddProducts = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Adding product: ${name}, ${description}, ${price}, ${stock}`);
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
    };

    return (
        <div className="add-product">            
            <form className='add-product-form' onSubmit={handleSubmit}  >
            <h2>Add Product</h2>
                <div className="form-control">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="price">Price:</label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="stock">Stock:</label>
                    <input
                        id="stock"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};
