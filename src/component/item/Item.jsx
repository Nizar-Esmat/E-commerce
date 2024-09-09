// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Link} from "react-router-dom";

function Item({prod}) {
    return (
        <div className="md:w-1/4 sm:w-1/2 container " >
            <div className="product p-2 cursor-pointer ">
<Link to={`/ProductDetails/${prod._id}/${prod.category._id}`}>
                <img className="w-full" src={prod?.imageCover} alt=""/>
                <p className="text-green-700 text-center font-bold py-2 ">{prod?.category?.name}</p>
                <h2 className="line-clamp-1" >{prod?.title}</h2>
                <div>
                    <p> {prod.price} EGP</p>
                    <p><i className="fa-solid fa-star text-yellow-400 line-clamp-1"></i> {prod.ratingsAverage} </p>
                </div>
</Link>
                <button className=" rounded p-2 bg-green-600 text-white btn line-clamp-1" > add to cart</button>
            </div>
        </div>
    );
}

export default Item;