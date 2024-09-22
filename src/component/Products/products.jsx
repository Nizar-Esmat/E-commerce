// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import FeatuerProduct from "../featuerProduct/featuerProduct.jsx";
import { getCategories } from "../../APIS/getcatigory.js";
import {getProductWithcatigory} from "../../APIS/getProduct.js";
import Loading from "../Loading/Loading.jsx";
import {Helmet} from "react-helmet";

function Products() {
    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState('');
    let [Categories, setCategories] = useState([]);

    let[oneCategories, setOneCategories] = useState([]);

    // Function to fetch the categories data
    async function getCategoriesApi() {
        setLoading(true);
        try {
            let data = await getCategories();
            if (data?.data) {
                setCategories(data.data);
                setMsg('');
            } else {
                setMsg("There is no data");
            }
            // eslint-disable-next-line no-unused-vars
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
        return <Loading></Loading>;
    }

    if (msg) {
        return <div className="text-center py-10 text-red-500 font-bold">{msg}</div>;
    }

    async function getdata(id){
      let data  = await getProductWithcatigory(id)
        setOneCategories(data.data)


    }
    return (
        <div className="container mx-auto py-10 px-4">
            <Helmet>
                <title>product compounent</title>
                <meta name="description" content="Helmet application" />
            </Helmet>


            <ul className="flex flex-wrap sm:flex-row gap-4 justify-center sm:justify-start mb-10">
                {Categories?.map((item, index) => (
                    <li
                        onClick={() => getdata(item._id)}
                        key={index}
                        className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-lg font-semibold cursor-pointer hover:bg-green-600 hover:text-white transition duration-300 ease-in-out"
                    >
                        {item?.name}
                    </li>
                ))}
            </ul>


            <div>
                <h1 className=" font-semibold text-green-500 font-bold mb-6 text-center">
                    Featured Products
                </h1>
                {(oneCategories.length) ? <h1 className=" font-semibold text-green-500 font-bold mb-6 text-center">{oneCategories[0].category.name}</h1> : <h1 className=" font-semibold text-green-500 font-bold mb-6 text-center" >all items</h1> }
                <FeatuerProduct arr={oneCategories}/>

            </div>
        </div>
    );
}

export default Products;
