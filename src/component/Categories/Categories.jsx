import React, {useEffect, useState} from 'react';
import {getProduct} from "../../APIS/getProduct.js";
import {getCategories} from "../../APIS/getcatigory.js";
import Loading from "../Loading/Loading.jsx";
import Slider from "react-slick";
function Categories(props) {

    var settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows:false,
        autoplay:true,
        autoplaySpeed: 200,
    };

    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState('');
    let [Categories, setCategories] = useState([])

    // Function to fetch the product data
    async function getCategoriesApi() {
        setLoading(true);
        try {
            let data = await getCategories();
            if (data?.data) {
                setCategories(data.data);
                console.log(data.data)
                setMsg('');
            } else {
                setMsg("There is no data");
            }
        } catch (error) {
            setMsg("Error fetching data");
        } finally {
            setLoading(false); // Ensure loading state is updated in both success and failure cases
        }
    }
useEffect(()=>{
    getCategoriesApi();
},[])

    if (loading) {
        return <Loading></Loading>;
    }

    if (msg) {
        return <div className="text-center py-10 text-red-500 font-bold">{msg}</div>;
    }
    return (
    <Slider {...settings}>

        {Categories.map( (i)=> <img className='h-[200px]' style={{objectFit:"cover"}} src={i.image} key={i._id} />) }
    </Slider>
    );
}

export default Categories;