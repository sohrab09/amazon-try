import React from 'react';

const ReviewItem = (props) => {
    const { img, name, quantity, key, price } = props.product;
    const reviewStyle={
        borderBottom: '1px solid gray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
        marginRight: '200px'
    };
    return (
        <div style={reviewStyle}>
            <h4 className="product-name">Product Name: {name}</h4>
            <h5>Add Product Quantity: {quantity}</h5>
            <img className="product-image" src={img} alt="" />
            <p><small>Product Price: {price}</small></p>
            <br/>
            <button onClick = {() => props.removeProduct(key)}className="cart-button">Remove</button>
        </div>
    );
};

export default ReviewItem;