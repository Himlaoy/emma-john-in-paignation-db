import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Order = () => {
    const saveCard = useLoaderData()
    const [card, setCard] = useState(saveCard)
    const handleDelete =(id)=>{
       const remaining = card.filter(pd=>pd._id !==id)
       setCard(remaining)
       removeFromDb(id)
    }
    const allDelete=()=>{
        setCard([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='PPcart'>
                {
                    card.map(product=><ReviewItem product={product} key={product._id} handleDelete={handleDelete}></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={card} allDelete={allDelete}>
                    <Link to={'/order'}>
                        <button className='btn-dlt-card'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Order;