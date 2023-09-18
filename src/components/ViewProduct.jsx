/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useContext, useState } from 'react'

import { ShopInfoContext } from '@/store/Context';

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';


import WhatsAppIcon from '@mui/icons-material/WhatsApp';


export default function ViewProduct({ viewProduct, setOpenView, openView }) {

    const { shopsInfos } = useContext(ShopInfoContext)

    // console.log(viewProduct);
    const product = viewProduct;

    return (
        <Transition.Root show={openView} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpenView}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-4xl md:px-4 lg:max-w-6xl">
                                <div className="relative flex w-full my-auto mx-3 rounded-xl lg:rounded-none items-center bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8 "
                                        onClick={() => setOpenView(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="sm:flex w-full grid-cols-1 items-start gap-x-2 gap-y-8 sm:grid-cols-12 lg:gap-x-8 justify-center h-[600px] sm:h-[500px] max-h-[800px] lg:h-auto overflow-auto">
                                        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg sm:col-span-4 lg:col-span-5 my-auto">
                                            <img src={product.url} alt="image" className="object-cover object-center lg:max-h-[500px]" />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7 my-auto pb-4">
                                            <h2 className="text-xl font-bold text-gray-900 border-b-2 pt-5">{product.productName}</h2>

                                            <section aria-labelledby="information-heading" className="mt-2">
                                                <p className='text-lg font-medium'>Price : ₹{product.price}</p>
                                                <p className="text-slate-500 flex ">Mrp : ₹<b className="line-through">{product.mrp}</b></p>
                                            </section>

                                            <h3 id="options-heading" className="font-bold border-b-2 py-2 mt-10 sm:mt-5">
                                                About
                                            </h3>
                                            <section aria-labelledby="options-heading" className="max-h-[200px] overflow-y-auto">
                                                <p >Category : {product.categoryName}</p>
                                                <p style={{ whiteSpace: 'pre-wrap' }}>{product.aboutProduct}</p>

                                            </section>

                                            <section aria-labelledby="Chat" className="mt-10 justify-center transition ease-linea items-center flex mx-auto px-4 align-middle border-2 rounded-full hover:bg-green-700 hover:color">
                                                {shopsInfos.map(shopInfo => {
                                                    return (

                                                        <IconButton className="align-bottom hover:text-white"
                                                            aria-label="delete" size="normal"
                                                            href={`https://wa.me/+91${shopInfo.whatsAppNumber}?text=` +
                                                                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + '%0a' +
                                                                '--------- *PRODUCT DETAILS* ----------' + '%0a' +
                                                                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + '%0a' +
                                                                `Name     : ${product.productName}` + '%0a' +
                                                                `Price    : ₹${product.price}` + '%0a' +
                                                                `Category : ${product.categoryName}` + '%0a'
                                                            }
                                                            target="_blank">
                                                            <WhatsAppIcon fontSize="inherit" /><span className='ps-2 text-xl'>Chat Now</span>
                                                        </IconButton>

                                                    )
                                                })}
                                            </section>

                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
