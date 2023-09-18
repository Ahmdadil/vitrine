/*****************************************************************************************************/
// USED IN HOME //
/*****************************************************************************************************/
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useContext, useState } from "react"
import { ProductsContext } from "@/store/Context"

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function Products({ viewCategory, setViewProduct, setOpenView }) {

    const { products } = useContext(ProductsContext)

    const handleProductClick = (product) => {
        setViewProduct(product);
        setOpenView(true);
    }


    const showcategory = viewCategory;

    const [currentPage, setCurrentPage] = useState(1)
    const productsCountPerPage = 15;
    const lastIndex = currentPage * productsCountPerPage;
    const firstIndex = lastIndex - productsCountPerPage;
    const productsPerPage = products.slice(firstIndex, lastIndex)
    const npage = Math.ceil(products.length / productsCountPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }

    }

    const changeCurrentPage = (n) => {
        setCurrentPage(n)
    }

    return (
        <div className="px-2 my-5 shadow-lg sm:mx-5 lg:mx-20 py-5 align-middle">

            <h1 className="font-bold text-2xl">Products</h1>
            <div className="product-container justify-center flex flex-wrap mx-auto lg:w-10/12 my-2">
                {productsPerPage.map(product => {
                    if (showcategory == product.categoryName) {
                        return (

                            <div key={product.id} onClick={() => handleProductClick(product)} className='product-card w-5/12 h-auto overflow-auto md:w-52 md:h-auto  lg:w-60 lg:h-auto  
                            my-5 m-2 md:m-3 lg:m-5 shadow-xl rounded-xl p-2 sm:p-2 md:p-3 lg:p-4 text-left border-2 border-slate-100 transition duration-300 ease-in-out hover:scale-105'>
                                <img src={product.url} alt={product.productName} className="w-auto h-auto mx-auto mb-2 flex flex-wrap rounded-sm" />
                                <div className="mt-auto ">
                                    <h2 className="font-semibold text-lg">{product.productName}</h2>
                                    <p>Category : {product.categoryName}</p>
                                    <p>Price : ₹{product.price}</p>
                                    <p className="text-slate-500 flex ">Mrp : ₹<b className="line-through">{product.mrp}</b></p>
                                </div>
                            </div>
                        )
                    }
                    if (showcategory == 'all') {
                        return (

                            <div key={product.id} onClick={() => handleProductClick(product)} className='product-card w-5/12 h-auto overflow-auto md:w-52 md:h-auto  lg:w-60 lg:h-auto  
                            my-5 m-2 md:m-3 lg:m-5 shadow-xl rounded-xl p-2 sm:p-2 md:p-3 lg:p-4 text-left border-2 border-slate-100 transition duration-300 ease-in-out hover:scale-105 cursor-pointer'>
                                <img src={product.url} alt={product.productName} className="w-auto h-auto mx-auto mb-2 flex flex-wrap rounded-sm" />
                                <div className="">
                                    <h2 className="font-semibold text-lg">{product.productName}</h2>
                                    <p className="my-1">Category : {product.categoryName}</p>
                                    <p className="my-1">Price : ₹{product.price}</p>
                                    <p className="text-slate-500 flex my-1 ">Mrp : ₹<b className="line-through">{product.mrp}</b></p>
                                </div>
                            </div>
                        )
                    }
                })}

            </div>
            <div className='justify-center flex'>
                <nav>
                    <ul className='pagination'>
                        <li className='page-item mx-2'>
                            <a href="#" className='page-link rounded-md bg-transparent border-stone-400' onClick={prePage}><ArrowBackIosIcon fontSize=''/></a>
                        </li>
                        {
                            numbers.map((n, i) => {
                                return (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a href="#" className='page-link rounded-md bg-slate-500 border-stone-400 mx-1'
                                            onClick={() => { changeCurrentPage(n) }}> {n} </a>
                                    </li>
                                )
                            })
                        }
                        <li className='page-item mx-2'>
                            <a href="#" className='page-link rounded-md bg-transparent border-stone-400' onClick={nextPage}><ArrowForwardIosIcon fontSize=''/></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    )
}
