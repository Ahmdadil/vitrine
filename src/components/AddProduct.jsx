/*****************************************************************************************************/
// IN ADMIN PAGE//
/*****************************************************************************************************/


import React, { useContext, useState } from 'react'
import { FirebaseContext, AuthContext } from "../store/Context";

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

//for croping uploading image
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function AddProduct({ closeModal, categoryId, categoryName }) {

    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(AuthContext)

    const [image, setImage] = useState(null)
    const [productName, setProductName] = useState('')
    const [aboutProduct, setAboutProduct] = useState('')
    const [price, setPrice] = useState('')
    const [mrp, setMrp] = useState('')
    const date = new Date()

    const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
    let uploadBtnText = "Upload Image"
    if (image) {
        uploadBtnText = "Change Image"
    }

    //for croping
    const [cropImage, setCropImage] = useState(null); // Store the cropped image here
    const [crop, setCrop] = useState(null);

    // Function to handle cropping
    const handleCrop = (e) => {
        e.preventDefault()
        if (crop) {
            const croppedCanvas = crop.getCroppedCanvas();
            if (croppedCanvas) {
                croppedCanvas.toBlob((blob) => {
                    blob.name = image.name
                    setCropImage(blob);
                })

            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.storage().ref(`/image/${productName}/${cropImage.name}`).put(cropImage).then(({ ref }) => {
            ref.getDownloadURL().then((url) => {
                //console.log(url);
                firebase.firestore().collection('products').add({
                    productName,
                    aboutProduct,
                    categoryId,
                    categoryName,
                    price,
                    mrp,
                    url,
                    userId: user.uid,
                    createAt: date.toDateString()
                }).then(() => {
                    alert('Product Added.');
                    location.reload();
                })

            })
        })

    }



    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-wrap items-center justify-center overflow-auto py-2">

            <div className="bg-white bg-opacity-70 rounded-3xl m-3 p-3 max-h-screen overflow-auto">
                <div className="py-3 flex sm:flex-row justify-between text-center border-b-2 border-gray-400">
                    <h1 className="font-semibold text-center text-xl text-gray-700">Add Product</h1>
                    <Button className=" " variant="outline" onClick={closeModal}>
                        X
                    </Button>
                </div>

                <div className="inline-block align-bottom rounded-xl text-left overflow-hidden transform transition-opacity sm:my-5 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="px-3 pt-5 sm:p-5 sm:pb-3">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <form>
                                    <div>
                                        <label htmlFor="text" className="mt-3 block text-sm font-medium leading-6 text-left">
                                            Product Name
                                        </label>
                                        <div >
                                            <input
                                                onChange={(e) => { setProductName(e.target.value) }}
                                                id="name"
                                                name="name"
                                                type="text"
                                                autoComplete="on"
                                                required
                                                placeholder=" Enter Name"
                                                className=" block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="text" className="mt-3 block text-sm font-medium leading-6 text-left">
                                            About Product
                                        </label>
                                        <div >
                                            <input
                                                onChange={(e) => { setAboutProduct(e.target.value) }}
                                                id="about"
                                                name="about"
                                                type="text"
                                                autoComplete="on"
                                                required
                                                placeholder=" Enter Product Details"
                                                className=" block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                multiple
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="text" className="mt-3 block text-sm font-medium leading-6 text-left">
                                            Price
                                        </label>
                                        <div >
                                            <input
                                                onChange={(e) => { setPrice(e.target.value) }}
                                                id="price"
                                                name="price"
                                                type="number"
                                                autoComplete="on"
                                                required
                                                placeholder=" Enter Price"
                                                className=" block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="text" className="mt-3 block text-sm font-medium leading-6 text-left">
                                            MRP
                                        </label>
                                        <div >
                                            <input
                                                onChange={(e) => { setMrp(e.target.value) }}
                                                id="mrp"
                                                name="mrp"
                                                type="number"
                                                autoComplete="on"
                                                placeholder=" Enter MRP"
                                                className=" block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="text" className="mt-3 block text-sm font-medium leading-6 text-left">
                                            Image
                                        </label>
                                        <img alt="Post Image" className='w-48 h-auto' src={cropImage ? URL.createObjectURL(cropImage) : ''}></img>
                                        <br />

                                        <Button
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                            href={"#"}
                                        >
                                            {uploadBtnText}
                                            <VisuallyHiddenInput type="file" onChange={(e) => { setImage(e.target.files[0]) }} required />
                                        </Button>
                                        <br />

                                        {image && (
                                            <div className='mt-3 rounded-xl'>
                                                <Cropper
                                                    style={{ height: "250px", width: "auto" }} // Adjust width as needed

                                                    aspectRatio={3 / 2}
                                                    src={URL.createObjectURL(image)}
                                                    minCropBoxHeight={10}
                                                    minCropBoxWidth={10}
                                                    background={false}
                                                    responsive={true}
                                                    autoCropArea={1}
                                                    checkOrientation={false}
                                                    onInitialized={(instance) => {
                                                        setCrop(instance); // Set the crop instance
                                                    }}
                                                    guides={false}
                                                />
                                                <button  onClick={handleCrop}>
                                                    Crop
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <Button onClick={handleSubmit} variant="outline" className="red my-5" type="submit">Add</Button>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProduct

