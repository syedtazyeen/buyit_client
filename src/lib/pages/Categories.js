import React, { useEffect, useState } from 'react'
import '../styles/Categories.css'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryProducts } from '../../service/redux/categorySlice';
import LoadingSpinner from '../components/LoadingSpinner'
import Error from '../containers/Error';

export default function Categories() {

    const {
        items, loading, error
    } = useSelector((state) => state.categoryProducts);

    // const [productsToShow, setProductsToShow] = useState(null)
    const [category, setCategory] = useState()
    let link = useParams()

    const nav = useNavigate();
    const handleClick = (id) => {
        nav("/product/" + id);

    };
    function handleItemClick(item) {
        setCategory(item)
        nav('/categories/' + item)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (link.category) setCategory(link.category);
        document.title = category || 'Search';
        dispatch(fetchCategoryProducts({ category }))
    }, [category, dispatch])


    return (
        <div>
            <div className='cat-container'>
                <div className='cat-menu'>
                    <h2>{category || "Select a category"}</h2>
                    <div className='cat-options'>
                        {cats.map((item) => (
                            <div
                                key={item}
                                onClick={() => handleItemClick(item)}
                                className='cat-option-item'>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
            <ProductList productsToShow={{ items: items, loading: loading, error: error }} handleClick={handleClick} />
        </div>
    )
}


function ProductList({ productsToShow, handleClick }) {

    if (productsToShow.loading) {
        return <LoadingSpinner />
    }

    if (productsToShow.error) {
        return <Error/>
    }
    if (productsToShow.items?.length === 0 || !productsToShow.items) {
        return (
            <div className='no-cat'>No items found!</div>
        )
    }
    else return (
        <div className="">
            <div className="products-grid">
                {productsToShow.items?.length > 0 && productsToShow.items?.map((item) => (
                    <div
                        key={item.productId}
                        onClick={() => handleClick(item.productId)}
                        className="grid-item link-style"
                    >
                        <img src={item.imgUrl} alt=''/>
                        <p>{item.name}</p>
                        <h1>₹&nbsp;{item.price}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}
















const cats = [
   // "All",
    "Fashion",
    "Selfcare",
    "Electronics",
    "Furnitures",

]
