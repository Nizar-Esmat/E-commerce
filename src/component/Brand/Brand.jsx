import React, { useContext, useState } from 'react';
import { CounterContext } from "../counterCountext/counterContext.jsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading.jsx";
import {Link} from "react-router-dom";

function Brand(props) {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [brandProducts, setBrandProducts] = useState([]);

    // Fetch brands
    function getBrand() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

    // Fetch products by brand ID
    function getProductsByBrand(brandId) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
    }

    let { isLoading: isLoadingBrands, isError: isErrorBrands, error: errorBrands, data } = useQuery({
        queryKey: ['getBrands'],
        queryFn: getBrand
    });

    if (isLoadingBrands) {
        return <Loading />;
    }

    if (isErrorBrands) {
        return <h2 className="text-red-700 text-center">{errorBrands.message}</h2>;
    }

    const handleBrandClick = async (brandId) => {
        setSelectedBrand(brandId);
        console.log(brandId)
        try {
            const response = await getProductsByBrand(brandId);
            setBrandProducts(response.data.data); // Adjust based on your API response structure
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    return (
        <div>
            <div className="row flex flex-wrap">
                {data?.data?.data.map((item) => (
                    <div key={item._id} className="md:w-1/4 p-3 transform transition duration-500 hover:scale-105">
                        <Link to={`/BrandProduct/${item._id}`}>
                        <div
                            className="p-3 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            onClick={() => handleBrandClick(item._id)} // Handle brand click
                        >
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
                        </Link>
                    </div>
                ))}
            </div>

            {/* Display products of selected brand */}
            {selectedBrand && (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">Products for Selected Brand:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {brandProducts.length > 0 ? (
                            brandProducts.map((product) => (
                                <div key={product._id} className="p-3 bg-white shadow-lg rounded-lg">
                                    <h3 className="text-lg font-semibold">{product.title}</h3>
                                    <img
                                        src={product.imageCover}
                                        alt={product.title}
                                        className="w-full h-auto object-cover rounded mt-2"
                                    />
                                    <p className="text-green-600">{product.price} EGP</p>
                                </div>
                            ))
                        ) : (
                            <p>No products found for this brand.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Brand;
