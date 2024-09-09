import React, {useContext} from 'react';
import login from "../Login/Login.jsx";
import {CounterContext} from "../counterCountext/counterContext.jsx";
import FeatuerProduct from "../featuerProduct/featuerProduct.jsx";
import Categories from "../Categories/Categories.jsx";
import MainSlider from "../mainSlider/mainSlider.jsx";


function Home(props) {

    return (

        <>
            <MainSlider></MainSlider>
            <Categories></Categories>
            <FeatuerProduct></FeatuerProduct>
        </>
    );
}

export default Home;