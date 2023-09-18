/*****************************************************************************************************/
// IN HOME //
/*****************************************************************************************************/

import { CategoriesContext } from '@/store/Context'
import React, { useContext, useState } from 'react'

function Categories({ setViewCategory }) {

    const { categories } = useContext(CategoriesContext)

    return (
        <>
            <div className='mx-5 mt-5'>
                <h1 className="font-bold text-2xl">Category</h1>
            </div>
            <div className='flex justify-center items-center'>
                <div className='border-2 w-11/12 sm:w-9/12 lg:w-8/12 max-h-32  lg:max-h-32 overflow-auto mx-3 md:mx-5 my-3 md:my-5 px-2 py-2 rounded-lg flex flex-wrap justify-center'>
                    <a
                        onClick={() => { setViewCategory('all') }}
                        className='my-1 mx-2 text-base sm:text-lg md:text-lg lg:text-lg font-medium border-l-2 rounded-lg hover:bg-slate-400 px-3 md:px-5 transition duration-400 ease-in-out 
                        hover:scale-110 cursor-pointer'
                    >All</a>
                    {categories.map(category => {
                        return (
                            <button
                                onClick={() => { setViewCategory(category.category) }}
                                key={category.id}
                                className='my-1 text-base sm:text-lg mx-2 border-l-2 px-3 md:px-5 hover:bg-slate-400 hover:scale-110 rounded-lg transition duration-400 ease-in-out'
                            >{category.category}</button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Categories