import React, { useState } from 'react'

import Header from '@/components/Header'; 
import Banner from '@/components/Banner'
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import ViewProduct from "@/components/ViewProduct";
import OfferImage from '@/components/OfferImage';



function HomePage() {

    const [viewCategory,setViewCategory] = useState('all')
    const [openView, setOpenView] = useState(false)
    const [viewProduct, setViewProduct] = useState()
    // console.log(viewCategory); why there is 6 logs at initial and 2 logs on click?
    // console.log(viewProduct);
    // console.log(openView);
    return (
        <div className='Home items-center'>
            <Header />
            <Banner />
            <Categories setViewCategory={setViewCategory}/>
            <Products viewCategory={viewCategory} setViewProduct={setViewProduct} setOpenView={setOpenView}/>
            {openView && <ViewProduct viewProduct={viewProduct} setOpenView={setOpenView} openView={openView}/>}
            <OfferImage />
        </div>
    )
}

export default HomePage