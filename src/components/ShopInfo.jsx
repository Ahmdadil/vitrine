import React, { useState, useContext } from 'react';
import EditShopInfo from './EditShopInfo';

import { ShopInfoContext } from '@/store/Context';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import StorefrontIcon from '@mui/icons-material/Storefront';



function ShopInfo() {

  const { shopsInfos } = useContext(ShopInfoContext)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);


  return (
    <div>
      {shopsInfos.map(shopInfo => {
        return (
          <div key={shopInfo.id} className='w-11/12 sm:w-8/12 md:w-9/12 lg:w-7/12 h-fit border-2 rounded-lg mx-auto p-2 text-left my-2 justify'>
            <div className='border-b-2 mb-2 py-2 flex justify-between'>
              {open && <EditShopInfo setOpen={() => setOpen(false)} open={open} shopInfo={shopInfo} />}
              <h1 className='text-2xl font-medium  text-center mx-2'><StorefrontIcon fontSize="large" /> Shop Info</h1>
              <Button className='right-0 absolute' variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>Edit Info</Button>
            </div>
            <div className='sm:flex sm:justify-between'>
              <div className=''>
                <h1 className='font-medium'>Shop Name : <span className='font-normal'>{shopInfo.shopName}</span></h1>
                <p className='font-medium'>Shop Address :  <span className='font-normal'>{shopInfo.shopAddress}</span></p>
                <p className='font-medium'>Contact Number :  <span className='font-normal'>{shopInfo.contactNumber}</span></p>
                <p className='font-medium'>Instagram User Name : <span className='font-normal'>{shopInfo.instaUserName}</span></p>
                <p className='font-medium'>Facebook User Name : <span className='font-normal'>{shopInfo.fbUserName}</span></p>
              </div>
              <div className='mx-auto text-center'>
                <img className='p-3 w-36 h-36  sm:w-36 sm:h-36 rounded-full mx-auto lg:w-40 lg:h-40' src={shopInfo.url} alt="" />
                <p className='font-medium'>Logo</p>
              </div>
            </div>
            
          </div>
        )
      })}


    </div>
  )
}

export default ShopInfo


{/* <h1 className='text-lg font-medium  text-center mt-5'>Social Medias</h1>

<div className='flex justify-between my-2 px-4'>
  <div className='text-center'>
    <a href={`https://wa.me/+91${shopInfo.whatsAppNumber}`} target="_blank" rel="noopener noreferrer">
      <IconButton aria-label="delete" size="large">
        <WhatsAppIcon fontSize="large" />
      </IconButton>
      <p>+91{shopInfo.whatsAppNumber}</p>
    </a>
  </div>

  <div className='text-center'>
    <a href={`https://www.instagram.com/${shopInfo.instaUserName}/`} target="_blank" rel="noopener noreferrer">
      <IconButton aria-label="delete" size="large">
        <InstagramIcon fontSize="large" />
      </IconButton>
      <p>{shopInfo.instaUserName}</p>
    </a>
  </div>

  <div className='text-center'>
    <a href={`https://www.facebook.com/${shopInfo.fbUserName}/`} target="_blank" rel="noopener noreferrer">
      <IconButton aria-label="delete" size="large">
        <FacebookIcon fontSize="large" />
      </IconButton>
      <p>{shopInfo.fbUserName}</p>
    </a>
  </div>
</div> */}