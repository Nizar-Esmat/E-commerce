import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from "./Loading/Loading.jsx";
import Item from "./item/Item.jsx";

function BrandProduct() {
    const { brandId } = useParams(); // Get the brandId from the URL
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    console.log(brandId)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
                setProducts(response.data.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [brandId]); // Fetch products when brandId changes

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching products.</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Products for Brand</h2>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Item prod={product} key={product._id}></Item>
                    ))
                ) : (
                    <p className=" m-auto text-red-700 text-2xl font-bold">No products found for this brand.</p>
                )}
            </div>
        </div>
    );
}

export default BrandProduct;
