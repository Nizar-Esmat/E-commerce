import React, { useEffect, useState } from 'react';
import { getCategories } from "../../APIS/getcatigory.js";
import Loading from "../Loading/Loading.jsx";
import Slider from "react-slick";

function Categories() {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [categories, setCategories] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000, // Slowing down the autoplay
    };

    // Function to fetch the category data
    async function getCategoriesApi() {
        setLoading(true);
        try {
            const data = await getCategories();
            if (data?.data) {
                setCategories(data.data);
                setMsg('');
            } else {
                setMsg("There is no data");
            }
        } catch (error) {
            setMsg("Error fetching data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategoriesApi();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (msg) {
        return <div className="text-center py-10 text-red-500 font-bold">{msg}</div>;
    }

    if (categories.length === 0) {
        return <div className="text-center py-10 text-gray-500 font-bold">No categories available</div>;
    }

    return (
        <Slider {...settings}>
            {categories.map((category) => (
                <div key={category._id} className="px-2">
                    <img
                        className="h-[200px] w-full object-cover"
                        src={category.image || 'fallback-image-url.jpg'} // Providing a fallback image
                        alt={category.name || 'Category image'} // Improved alt description
                        loading="lazy" // Lazy loading for images
                    />
                </div>
            ))}
        </Slider>
    );
}

export default Categories;
