import React from 'react';

const Cart = (props) => {
    const cart = props.cart;

    // using reduce process total price showing system 
    // const total = cart.reduce( (total, prd) => total + prd.price , 0);

    // Using for loop process total price showing system
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }

    // Adding Shipping Cost 

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    // Adding Tax 
    const tax = total / 10;

    // Adding Grand Total
    const grandTotal = (total + shipping + Number(tax));

    // Formatting Number
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary: {cart.length}</h4>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {formatNumber(tax)}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
        </div>
    );
};

export default Cart;