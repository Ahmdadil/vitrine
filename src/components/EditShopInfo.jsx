import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext, AuthContext } from "../store/Context";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';




import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

//for croping uploading image
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function EditShopInfo({ setOpen, open, shopInfo }) {

    const [logoUrl, setLogoUrl] = useState()
    useEffect(() => {
        setShopName(shopInfo.shopName);
        setShopAddress(shopInfo.shopAddress);
        setContactNumber(shopInfo.contactNumber);
        setLogoUrl(shopInfo.url);
        setWhatsAppNumber(shopInfo.whatsAppNumber);
        setInstaUserName(shopInfo.instaUserName);
        setFbUserName(shopInfo.fbUserName);
        setEmail(shopInfo.email);
    }, [])

    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(AuthContext)

    //About Shop
    const [shopName, setShopName] = useState()
    const [shopAddress, setShopAddress] = useState()
    const [contactNumber, setContactNumber] = useState()
    const [shopLogo, setShopLogo] = useState(null)
    //Socialmedia 
    const [whatsAppNumber, setWhatsAppNumber] = useState()
    const [instaUserName, setInstaUserName] = useState()
    const [fbUserName, setFbUserName] = useState()
    const [email, setEmail] = useState()
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

    //for croping
    const [cropLogo, setCropLogo] = useState(null); // Store the cropped image here
    const [crop, setCrop] = useState(null);

    // Function to handle cropping
    const handleCrop = (e) => {
        e.preventDefault()
        if (crop) {
            const croppedCanvas = crop.getCroppedCanvas();
            if (croppedCanvas) {
                croppedCanvas.toBlob((blob) => {
                    blob.name = shopLogo.name
                    setCropLogo(blob);
                    setShopLogo();

                })

            }
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault()
        if (cropLogo) {

            firebase.storage().ref(`/image/shopLogo/${cropLogo.name}`).put(cropLogo).then(({ ref }) => {
                ref.getDownloadURL().then((url) => {
                    //console.log(url);
                    firebase.firestore().collection('shop_info').doc(shopInfo.id).update({
                        shopName,
                        shopAddress,
                        contactNumber,
                        whatsAppNumber,
                        instaUserName,
                        fbUserName,
                        email,
                        url,
                        userId: user.uid,
                        createAt: date.toDateString()
                    }).then(() => {
                        alert('Shop Info Updated.');
                        location.reload();
                    })

                })
            })
        }
        else {
            firebase.firestore().collection('shop_info').doc(shopInfo.id).update({
                shopName,
                shopAddress,
                contactNumber,
                whatsAppNumber,
                instaUserName,
                fbUserName,
                email,
                userId: user.uid,
                createAt: date.toDateString()
            }).then(() => {
                alert('Shop Info Updated.');
                location.reload();
            })
        }

    }



    return (
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
                                SHOP INFO
                            </Typography>
                            <CloseIcon fontSize='large' className='cursor-pointer hover:bg-slate-200 rounded-lg' sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={setOpen} />
                        </div>

                        <TextField
                            className='lg:w-5/12'
                            id="outlined-controlled"
                            label="Shop Name"
                            value={shopName}
                            size="small"
                            onChange={(event) => {
                                setShopName(event.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <StorefrontIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            className='lg:w-4/12'
                            id="outlined-controlled"
                            label="Contact Number"
                            value={contactNumber}
                            size="small"
                            onChange={(event) => {
                                setContactNumber(event.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneInTalkIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            className='lg:w-9/12 w-9/12 my-2'
                            id="outlined-controlled"
                            label="Shop Address"
                            value={shopAddress}
                            size="normal"
                            onChange={(event) => {
                                setShopAddress(event.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ContactMailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            multiline
                        />

                        <div>
                            {(logoUrl || cropLogo) &&
                                <div>
                                    <label htmlFor="text" className="my-3 block  text-sm font-medium ">
                                        Logo
                                    </label>
                                    <img alt="Shop Logo" className='w-48 h-auto mx-auto' src={cropLogo ? URL.createObjectURL(cropLogo) : logoUrl}></img>
                                </div>

                            }
                            <br />
                            {(shopLogo && !cropLogo) && (
                                <div className='mt-3 rounded-xl border-2 p-2 md:w-10/12 mx-auto'>
                                    <Cropper className='mb-5'
                                        style={{ height: "250px", width: "auto" }} // Adjust width as needed

                                        aspectRatio={3 / 2}
                                        src={URL.createObjectURL(shopLogo)}
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
                            <div className='my-2'>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<CloudUploadIcon />}
                                    href={"#"}
                                >
                                    {cropLogo || logoUrl ? "Change Logo" : "Upload Logo"}
                                    <VisuallyHiddenInput type="file" onChange={(e) => { setShopLogo(e.target.files[0]) }} />
                                </Button>
                            </div>
                            <br />


                        </div>

                        <div className='text-center mb-3 '>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Social Media Info
                            </Typography>
                        </div>

                        <TextField
                            className='lg:w-5/12 my-2'
                            id="outlined-controlled"
                            label="WhatsApp Number"
                            value={whatsAppNumber}
                            size="small"
                            onChange={(event) => {
                                setWhatsAppNumber(event.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <WhatsAppIcon />
                                    </InputAdornment>
                                ),
                            }}

                        />

                        <TextField
                            className='lg:w-4/12 my-2'
                            id="outlined-controlled"
                            label="Instagram Username"
                            value={instaUserName}
                            size="small"
                            onChange={(event) => {
                                setInstaUserName(event.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <InstagramIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            className='lg:w-5/12 my-2'
                            id="outlined-controlled"
                            label="Facebook Profile Link"
                            value={fbUserName}
                            size="small"
                            onChange={(event) => {
                                setFbUserName(event.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FacebookIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            className='lg:w-4/12 my-2'
                            id="outlined-controlled"
                            label="Email"
                            value={email}
                            size="small"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br />
                        <div className='my-3'>
                            <Button className='md:w-3/12' startIcon={<LabelImportantIcon />} variant="contained" onClick={handleSubmit}>
                                Save
                            </Button>
                        </div>
                    </Box>


                </div>
            </Modal>

        </div>
    );
}