import React, { useEffect, useState, useContext } from 'react';

import { ShopInfoContext } from '@/store/Context';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ForumIcon from '@mui/icons-material/Forum';
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube, AiOutlineWhatsApp, AiOutlineInstagram } from "react-icons/ai";
import CloseIcon from '@mui/icons-material/Close';



export default function FloatIcon() {


    const { shopsInfos } = useContext(ShopInfoContext)

    const [open, setOpen] = useState(false);
    const [showIcon, setShowIcon] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // Function to check scroll position and footer position
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const footer = document.getElementById('footer'); // Replace 'footer' with the actual ID of your footer element

            if (footer) {
                const footerPosition = footer.getBoundingClientRect().top + window.scrollY;

                // You can adjust these conditions based on your design requirements
                if (scrollY > footerPosition - 700) {
                    setShowIcon(false); // Hide the icon when near the footer
                } else {
                    setShowIcon(true); // Show the icon otherwise
                }
            }
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {shopsInfos.map(shopInfo => {

                const actions = [
                    { icon: <FaFacebookF />, name: `${shopInfo.fbUserName}`, url: `https://www.facebook.com/${shopInfo.fbUserName}/` },
                    { icon: <AiOutlineWhatsApp />, name: `${shopInfo.whatsAppNumber}`, url: `https://wa.me/+91${shopInfo.whatsAppNumber}` },
                    { icon: <AiFillYoutube />, name: 'Youtube', url: `#` },
                    { icon: <AiOutlineInstagram />, name: `${shopInfo.instaUserName}`, url: `https://www.instagram.com/${shopInfo.instaUserName}/` },
                ];

                return (
                    showIcon && <div key={shopInfo.id} className={`fixed bottom-4 right-4 ${showIcon ? 'opacity-100 transition-opacity ' : 'opacity-0 transition-opacity'}`}>

                        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                            <SpeedDial
                                ariaLabel="SpeedDial controlled open example"
                                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                open={open}
                                icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
                            >
                                {actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={()=>{
                                            handleClose,
                                            window.open(action.url,'_blannk');
                                            
                                        }}
                                    />
                                ))}
                            </SpeedDial>
                        </Box>
                    </div>)
            })
            }
        </>

    );
}