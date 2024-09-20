import React, {useContext} from 'react';
import login from "../Login/Login.jsx";
import {CounterContext} from "../counterCountext/counterContext.jsx";
import FeatuerProduct from "../featuerProduct/featuerProduct.jsx";
import Categories from "../Categories/Categories.jsx";
import MainSlider from "../mainSlider/mainSlider.jsx";
import {Helmet} from "react-helmet";


function Home(props) {

    return (

        <>
            <Helmet>
                <title>home compounent</title>
                <meta name="description" content="Helmet application" />
            </Helmet>

            <MainSlider></MainSlider>
            <Categories></Categories>
            <FeatuerProduct></FeatuerProduct>
        </>
    );
}

export default Home;