import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({ product, handleDelete }) => {
    console.log(product)
    const {id, img, price,quantity, ratings, seller, name,_id } = product
    return (
        <div className='item'>
            <img src={img} alt="" />
            <div className='order-detail'>
                <p className='title'>{name}</p>
                <p>Price : <span className='orange-text'>${price}</span></p>
                <p>Product quantity : <span className='quantity'>{quantity}</span></p>
            </div>
            <button onClick={()=>{handleDelete(_id)}}  className='delete'> <FontAwesomeIcon className='awesome' icon={faTrashAlt} /></button>
        </div>
    );
};

export default ReviewItem;