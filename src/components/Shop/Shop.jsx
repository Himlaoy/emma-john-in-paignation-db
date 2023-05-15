import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage]= useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(pageItems)
    const { totalProducts } = useLoaderData()
    console.log(totalProducts)

    const pageItems = 10;
    const totalPages = Math.ceil(totalProducts / pageItems)
    const pageNumber = [...Array(totalPages).keys()]
    console.log(pageNumber)
    const option = [10, 15, 20]

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const getCartData = getShoppingCart()
        let saveCart = []
        for (const id in getCartData) {
            const addProduct = products.find(product => product._id === id)
            if (addProduct) {
                const quantity = getCartData[id]
                addProduct.quantity = quantity
                saveCart.push(addProduct)
            }
        }
        setCart(saveCart)
    }, [products])

    const evenHandler = (product) => {
        // const newCart = [...cart, product]
        let newCart = []
        const exists = cart.find(pd => pd._id == product._id)
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id)
            newCart = [...remaining, exists]
        }
        setCart(newCart)
        addToDb(product._id)

    }
    const allDelete = () => {
        setCart([])
        deleteShoppingCart()
    }

    return (
        <>
            <div className='shop-container'>
                <div className='product-container'>
                    {
                        products.map(product => <Product product={product} key={product._id} handleAddToCart={evenHandler}></Product>)
                    }
                </div>
                <div className='cart-container'>
                    <Cart cart={cart} allDelete={allDelete}>
                        <Link to={'/CheckOut'}>
                            <button className='btn-dlt-card'>Checkout order</button>
                        </Link>
                    </Cart>
                </div>
            </div>

            <div className='pagination'>
                <p>current page: {currentPage}</p>
                {
                    pageNumber.map(page=> <button 
                        onClick={()=>setCurrentPage(page)}
                        key={page}>{page}</button> )
                }
                <select name="" id="">

                </select>
            </div>
        </>

    );
};

export default Shop;