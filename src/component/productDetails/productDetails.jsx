import React, { useEffect, useState } from 'react';
import { getOneProduct } from "../../APIS/getOneProduct.js";
import { useParams } from "react-router-dom";
import { getProductWithcatigory } from "../../APIS/getProduct.js";
import Item from "../item/Item.jsx";
import Loading from "../Loading/Loading.jsx";
import usemutationcart from "../../Hooks/usemutationcart.jsx";
import {addToCartApi} from "../../APIS/addToCart.js";
import {toast} from "react-toastify";
import {data} from "autoprefixer";
import {Helmet} from "react-helmet";

function ProductDetails() {
    let {mutate:addMutate, status ,data} = usemutationcart(addToCartApi)


    if(status==='success')
        toast.success(data?.data?.message)


    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState('');
    let [product, setProduct] = useState(null);
    let [img, setImgUrl] = useState('');
    let [spasifc, setSpasifc] = useState(null);

    const { id, catigory } = useParams();

    // Mutation for adding a product to the cart
    let [wish , setWish] = useState(false);

    function changeUrl(e) {
        setImgUrl(e.target.src);
    }

    // Get the product details
    async function getOneProductApi() {
        setLoading(true);
        try {
            let data = await getOneProduct(id);
            if (data?.data) {
                setProduct(data.data);
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

    // Get specific category products
    async function getProductWithcatigoryAPI() {
        setLoading(true);
        try {
            let data = await getProductWithcatigory(catigory);
            if (data?.data) {
                setSpasifc(data.data);
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
        getOneProductApi();
    }, [id]);

    useEffect(() => {
        getProductWithcatigoryAPI();
    }, [catigory]);

    if (loading) {
        return <Loading />;
    }

    if (msg) {
        return <div className="text-center py-10 text-red-500 font-bold">{msg}</div>;
    }


    return (
        product && (
            <div className="container mx-auto py-10">
                <Helmet>
                    <title>product details compounent</title>
                    <meta name="description" content="Helmet application"/>
                </Helmet>

                <div className="row flex flex-col md:flex-row items-center gap-8">
                    {/* Image Section */}
                    <div className="md:w-1/3 w-full">
                        <div className="relative border rounded-lg shadow-lg overflow-hidden">
                            <i
                                onClick={() => {
                                    setWish(!wish);
                                }}
                                className={`fa-2xl fa-heart absolute top-2 left-2 z-10 ${wish ? 'fa-solid text-red-500' : 'fa-regular text-gray-500'}`}
                                style={{
                                    padding: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: '50%'
                                }}
                            />
                            <img
                                className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-105"
                                src={img || product?.imageCover}
                                alt="Product"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <ul className="flex justify-center gap-4 mt-4">
                            {product?.images?.map((i) => (
                                <li key={i}>
                                    <img
                                        src={i}
                                        className="w-16 h-16 object-cover rounded-lg shadow cursor-pointer transition duration-500 ease-in-out transform hover:scale-110"
                                        alt="Thumbnail"
                                        onClick={changeUrl}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product Details Section */}
                    <div className="md:w-2/3 w-full">
                        <p className="text-green-700 font-bold py-2 uppercase text-sm">
                            {product?.category?.name}
                        </p>
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                            {product?.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            {product.description}
                        </p>

                        {/* Pricing and Rating */}
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xl font-bold text-green-600">
                                {product.price} EGP
                            </p>
                            <div className="flex items-center">
                                <i className="fa-solid fa-star text-yellow-400"></i>
                                <span className="ml-2 text-gray-800 font-medium">
                                    {product.ratingsAverage} / 5
                                </span>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button onClick={() => {
                            addMutate(product._id)
                        }}

                                className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <h2 className="text-center font-bold text-green-500 mt-10">Related Products</h2>

                <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {spasifc?.map(i => <Item prod={i} key={i._id}></Item>)}
                </div>

            </div>
        )
    );
}

export default ProductDetails;
