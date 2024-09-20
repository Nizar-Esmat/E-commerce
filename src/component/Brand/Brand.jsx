import React, {useContext} from 'react';
import {CounterContext} from "../counterCountext/counterContext.jsx";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import Loading from "../Loading/Loading.jsx";

function Brand(props) {

   function  getBrand(){
       return  axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

    let {isLoading
        ,isError
        ,error
        ,isFetching
        , data} = useQuery({ queryKey: ['getBrands'],
        queryFn: getBrand })
    console.log(data?.data?.data)

    if(isLoading){
        return <Loading></Loading>
    }

    if(isError){
        return <h2 className="text-red-700 text-center" >{error}</h2>
    }
    return (
        <div className="row flex flex-wrap">
            {data?.data?.data.map((item, i) => (
                <div key={i} className="md:w-1/4 p-3 transform transition duration-500 hover:scale-105">
                    <div
                        className="p-3 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        {/* Item Name */}
                        <p className="text-xl font-bold text-green-600 mb-2 text-center">{item.name}</p>

                        {/* Item Image */}
                        <div className="overflow-hidden rounded-lg">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Brand;