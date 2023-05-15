import React, { Children } from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({cart, allDelete, children}) => {
    

    // console.log(cart)

    let total = 0;
    let totalShipping = 0
    let quantity = 0;
    for (const product of cart) {
        //  one way to solve
        // product.quantity = product.quantity || 1;
        total = total + product.price * product.quantity
        totalShipping = totalShipping + product.shipping
        quantity = quantity + product.quantity
    }

    const tax = total * 7 / 100
    const grand = total + totalShipping + tax

    return (
        <div className='cart'>
            <h4>Order summary</h4>
            <p>Selected product : {quantity}</p>
            <p>Total price :$ {total}</p>
            <p>Total shipping : $ {totalShipping.toFixed(2)} </p>
            <p>Tax: $ {tax.toFixed(2)}</p>
            <h5>Grand total : $ {grand.toFixed(2)}</h5>
            <button onClick={allDelete} className='btn-dlt-card'>
                <span className='fnt'>Clear All Item</span>
                <FontAwesomeIcon className='awesome' icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default Cart;