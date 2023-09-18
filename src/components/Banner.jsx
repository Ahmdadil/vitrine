/*****************************************************************************************************/
// IN HOME//
/*****************************************************************************************************/
import { useState, useEffect } from "react";


export default function Banner() {

    const images = [
        'https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1924&q=80',
        'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
        'https://crediblesoft.com/wp-content/uploads/2020/08/Testing-Tips-for-E-Commerce-Stores.jpg',
    ];


    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 10000); // Change image every 10 seconds
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="relative h-[400px] lg:h-[600px]">
            <div className="relative h-full overflow-hidden">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transform transition-transform duration-1000 ease-in-out ${currentImage === index ? 'translate-x-0' : currentImage < index ? 'translate-x-full' : '-translate-x-full'
                            }`}
                    >
                        <img src={img} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${currentImage === idx ? 'bg-gray-500' : 'bg-gray-300'
                            }`}
                    ></div>
                ))}
            </div>
            <button
                onClick={prevImage}
                className="absolute left-0 bottom-1/2 transform -translate-y-1/2 p-2 text-xl text-white bg-black bg-opacity-50 rounded-full"
                style={{ zIndex: 1 }}
            >
                &lt;
            </button>
            <button
                onClick={nextImage}
                className="absolute right-0 bottom-1/2 transform -translate-y-1/2 p-2 text-xl text-white bg-black bg-opacity-50 rounded-full"
                style={{ zIndex: 1 }}
            >
                &gt;
            </button>
        </div>
    );
}
