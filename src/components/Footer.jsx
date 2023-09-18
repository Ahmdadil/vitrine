import { useContext } from 'react';

import { ShopInfoContext } from '@/store/Context'

import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube, AiOutlineWhatsApp, AiOutlineInstagram } from "react-icons/ai";



function Footer() {

    const { shopsInfos } = useContext(ShopInfoContext)


    
    return (
        <>
            <footer id='footer' className="border-t-2">
                <div className="container mx-auto  py-[8rem] text-center">
                    {/* footer div all */}
                    {shopsInfos.map(shopInfo => {
                        const iconsTab = [
                            { icon: <FaFacebookF />, link : `https://www.facebook.com/${shopInfo.fbUserName}/`},
                            { icon: <AiOutlineWhatsApp />, link : `https://wa.me/+91${shopInfo.whatsAppNumber}`},
                            { icon: <AiFillYoutube /> , link : `#`},
                            { icon: <AiOutlineInstagram />, link : `https://www.instagram.com/${shopInfo.instaUserName}/`},
                        ];

                        return (
                            <div key={shopInfo.id} className="flex justify-between flex-col md:flex-row  items-center md:items-start  md:gap-[5rem] text-left">
                                {/* logo side */}
                                <div className="flex flex-col w-1/2 md:p-0 py-4 gap-8 ">
                                    <img
                                        src={shopInfo.url}
                                        alt="footer_logo"
                                        className="w-[8rem] rounded-xl"
                                    />
                                    <p className="text-[15px] font-medium text-[#646464]">
                                    <span><strong>{shopInfo.shopName}</strong></span><br />
                                    {shopInfo.shopAddress}
                                    </p>
                                    {/* socials */}
                                    <div className="flex gap-7 text-[18px] text-[#646464] justify-center md:justify-start">
                                        {iconsTab.map(({ icon , link }, index) => {
                                            return (
                                                <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                                                <div
                                                    className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-[#ff0366] hover:text-white"
                                                    style={{ transition: "all 0.3s" }}
                                                >
                                                    {icon}
                                                </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                    <p className="text-[16px] font-medium text-[#646464]">
                                     | © {new Date().getFullYear()} e-Next |
                                        
                                    </p>
                                </div>


                                {/* right div */}
                                <div className="flex flex-col gap-8 py-5 border-b-2">
                                    <p className="text-[22px] font-bold footer-main border-b-4 border-red-700 pb-2">Working Hours</p>

                                    <p className="text-[16px]  text-[#646464] font-bold">
                                        Monday - Friday:
                                    </p>
                                    <p className="text-[16px] text-[#646464] font-medium">
                                        7:00am - 21:00pm
                                    </p>
                                    <p className="text-[16px] text-[#646464] font-bold">Saturday:</p>
                                    <p className="text-[16px] text-[#646464] font-medium">
                                        7:00am - 19:00pm
                                    </p>
                                    <p className="text-[16px] text-[#646464] font-bold ">
                                        Sunday - Closed
                                    </p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </footer>
        </>
    );
}

export default Footer;