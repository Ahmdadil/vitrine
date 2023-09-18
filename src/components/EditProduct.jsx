/*****************************************************************************************************/
// IN ADMIN PAGE//
/*****************************************************************************************************/


import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext, AuthContext } from "../store/Context";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import InfoIcon from '@mui/icons-material/Info';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import UpdateIcon from '@mui/icons-material/Update';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

//for croping uploading image
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function EditProduct({ open, closeModal, product }) {

    const [ImageUrl, setImageUrl] = useState()
    useEffect(() => {
        setProductName(product.productName);
        setPrice(product.price);
        setMrp(product.mrp);
        setImageUrl(product.url)
        setAboutProduct(product.aboutProduct);
        
    }, [])

    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(AuthContext)

    const [image, setImage] = useState(null)
    const [productName, setProductName] = useState('')
    const [aboutProduct, setAboutProduct] = useState('')
    const [price, setPrice] = useState('')
    const [mrp, setMrp] = useState('')
    const date = new Date()

    //for croping
    const [cropImage, setCropImage] = useState(null); // Store the cropped image here
    const [crop, setCrop] = useState(null);

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

        if(cropImage){

            firebase.storage().ref(`/image/${productName}/${cropImage.name}`).put(cropImage).then(({ ref }) => {
                ref.getDownloadURL().then((url) => {
                    //console.log(url);
                    firebase.firestore().collection('products').doc(product.id).update({
                        productName,
                        aboutProduct,
                        price,
                        mrp,
                        url,
                        userId: user.uid,
                        createAt: date.toDateString()
                    }).then(() => {
                        alert('Product Updated.');
                        location.reload();
                    })
                })
            }).catch((error) => {
                //console.error("Error updating : ", error);
            });
        }
        else{
            firebase.firestore().collection('products').doc(product.id).update({
                productName,
                aboutProduct,
                price,
                mrp,
                userId: user.uid,
                createAt: date.toDateString()
            }).then(() => {
                alert('Product Updated.');
                location.reload();
            })
        }

    }


    return (
        <>
            <div>
                <Modal className="backdrop-blur-sm overflow-auto max-h-screen "
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1 },
                                '.MuiInputBase-input': { fontSize: '1rem' },
                            }}
                            noValidate
                            autoComplete="off"

                            className="bg-white rounded-xl absolute top-1/2 left-1/2 max-h-screen overflow-auto mt-2
                         lg:py-5 flex-wrap transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-6/12 text-center px-1"
                        >


                            <div className='text-slate-950 border-b-2 align-middle text-center py-2 mb-4 px-3 justify-between flex '>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"

                                >
                                    EDIT PRODUCT
                                </Typography>
                                <CloseIcon fontSize='large' className='cursor-pointer hover:bg-slate-200 rounded-lg' sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={closeModal} />
                            </div>

                            <div className='md:flex '>

                                {(image && !cropImage) && (
                                    <div className='mt-3 rounded-xl border-2 md:w-8/12 '>
                                        <Cropper className='mb-5'
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
                                        <Button startIcon={<CropIcon />} variant="outlined" onClick={handleCrop}>
                                            Crop
                                        </Button>
                                    </div>
                                )}
                                {(ImageUrl || cropImage) &&
                                    <div className='md:w-5/12 mx-auto'>
                                        <label htmlFor="text" className="my-3 block  text-sm font-medium ">
                                            Product Image
                                        </label>
                                        <img alt="Shop Logo" className='w-48 h-auto mx-auto' src={cropImage ? URL.createObjectURL(cropImage) : ImageUrl}></img>
                                    </div>

                                }
                            </div>
                            <div className='my-4'>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<CloudUploadIcon />}
                                    href={"#"}
                                >
                                    {cropImage || ImageUrl ? "Change Image" : "Upload Image"}
                                    <VisuallyHiddenInput type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                                </Button>
                            </div>

                            <TextField
                                className='lg:w-3/12'
                                id="outlined-controlled"
                                label="Product Name"
                                value={productName}
                                size="small"
                                onChange={(event) => {
                                    setProductName(event.target.value);
                                }}

                            />

                            <TextField
                                className='lg:w-2/12 my-2'
                                id="outlined-controlled"
                                label="Price"
                                value={price}
                                size="small"
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CurrencyRupeeIcon fontSize='small' />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                className='lg:w-2/12 my-2'
                                id="outlined-controlled"
                                label="MRP"
                                value={mrp}
                                size="small"
                                onChange={(event) => {
                                    setMrp(event.target.value);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CurrencyRupeeIcon fontSize='small' />
                                        </InputAdornment>
                                    ),
                                }}

                            />

                            <TextField
                                className='lg:w-7/12 '
                                id="outlined-controlled"
                                label="About Product"
                                value={aboutProduct}
                                size="large"
                                onChange={(event) => {
                                    setAboutProduct(event.target.value);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <InfoIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                multiline
                            />

                            <br />
                            <div className='my-3'>
                                <Button className='md:w-3/12' startIcon={<UpdateIcon />} variant="contained" onClick={handleSubmit}>
                                    Update
                                </Button>
                            </div>
                        </Box>

                    </div>
                </Modal>
            </div>
        </>
    )
}

export default EditProduct