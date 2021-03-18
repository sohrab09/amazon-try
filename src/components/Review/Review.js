import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import greetings from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    //  Place Order  (handlePlacedOrder) add in onclick function
    const handleProceedCheckout = () => {
        history.push("/shipment")


        // // for product value add
        // setCart([]);
        // setOrderPlaced(true);
        // // remove item after place order  
        // processOrder();
    }


    // Remove Item from Cart 
    const removeProduct = (productKeys) => {
        // Remove item from Cart 
        const newCart = cart.filter(pd => pd.key !== productKeys)
        setCart(newCart);
        // Remove item from database  
        removeFromDatabaseCart(productKeys);
    }

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map (key => {
            const product = fakeData.find( pd =>  pd.key === key );
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    },[])

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={greetings} alt=""/>
    }

    return (
        <div className="shop-container">
            <div className="product-container">
            { 
                cart.map(pd => <ReviewItem 
                    product={pd} 
                    removeProduct={removeProduct}
                    key={pd.key}></ReviewItem>) 
            }
            {
                thankYou
            }
            </div>
            <div className="cart-container">
                <Cart cart ={cart}>
                        <button onClick={handleProceedCheckout} className="cart-button">Proceed Checkout</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;