import React from 'react';
import mainImg1 from '../../assets/finalProject assets/images/slider-image-1.jpeg';
import mainImg2 from '../../assets/finalProject assets/images/slider-image-2.jpeg';
import mainImg3 from '../../assets/finalProject assets/images/slider-image-3.jpeg';
import Slider from "react-slick";

function MainSlider(props) {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 300,
    };
    return (
        <div className="row">
            <div className="w-2/3">
                <Slider   {...settings}>
                    <img src={mainImg1} alt="" className="w-full" />
                    <img src={mainImg2} alt=""  className="w-full"/>
                    <img src={mainImg3} alt=""  className="w-full"/>
                </Slider>
            </div>
            <div className="w-1/3">
                <img src={mainImg2} alt=""  className="w-full" />
                <img src={mainImg3} alt=""  className="w-full" />
            </div>
        </div>
    );
}

export default MainSlider;