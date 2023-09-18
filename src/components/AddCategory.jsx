/*****************************************************************************************************/ 
                                    //IN ADMIN PAGE//
/*****************************************************************************************************/ 


import { FirebaseContext } from '@/store/Context'
import React, { useState, useContext } from 'react'
import { Button } from "./ui/button";

function AddCategory({ closeModal }) {

    const { firebase } = useContext(FirebaseContext)

    const [category, setCategory] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        //adding a category as an empty doc
        firebase.firestore().collection('product_categories').add({
            category
        }).then(()=>{
            alert('Category Added.');
            location.reload();
        })

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">

            <div className="bg-white bg-opacity-70 rounded-xl p-2">
                <div className="py-3 sm:px-6 sm:flex sm:flex-row-reverse text-right">
                    <Button variant="outline" onClick={closeModal}>
                        X
                    </Button>
                </div>
                <h1 className="font-semibold text-center text-xl text-gray-700">
                    Add Product Category
                </h1>
                <div className="inline-block align-bottom rounded-xl text-left overflow-hidden transform transition-opacity sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <form>
                                    <div className='my-5'>
                                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-left">
                                            Category
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={(e) => { setCategory(e.target.value) }}
                                                id="category"
                                                name="category"
                                                type="text"
                                                autoComplete="on"
                                                required
                                                placeholder=" Enter Category"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleSubmit} variant="outline" className="red" type="submit">Add</Button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddCategory