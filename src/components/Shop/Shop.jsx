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
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const { totalProducts } = useLoaderData()
    console.log(totalProducts)

    // const pageItems = 10;
    const totalPages = Math.ceil(totalProducts / itemsPerPage)
    const pageNumber = [...Array(totalPages).keys()]
    console.log(pageNumber)
    const options = [5, 10, 15, 20]

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const jsonData = await response.json();
            setProducts(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [currentPage, itemsPerPage]);

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

    const onChangeHandle =(event)=>{
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0)
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
                        className={currentPage === page ? "selected" : ''}
                        onClick={()=>setCurrentPage(page)}
                        key={page}>{page}</button> )
                }
                <select value={itemsPerPage} onChange={onChangeHandle}>
                    {
                        options.map(option=>
                            (<option key={option} value={option}>
                                {option}
                            </option>)
                                // console.log(option)
                        )
                    }
                </select>
            </div>
        </>

    );
};

export default Shop;