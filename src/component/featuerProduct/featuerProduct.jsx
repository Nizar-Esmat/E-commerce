import React, { useEffect, useState } from 'react';
import { getProduct } from "../../APIS/getProduct.js";
import Loading from "../Loading/Loading.jsx";
import Item from "../item/Item.jsx";

// eslint-disable-next-line react/prop-types
function FeatuerProduct({arr}) {
    // Use array destructuring for useState

    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState('');
    let [products, setProducts] = useState([])

    // Function to fetch the product data
    async function getProductApi() {
        setLoading(true);
        try {
            let data = await getProduct();
            if (data?.data) {
                setProducts(data?.data);
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

    // Call the API when the component mounts
    useEffect(() => {
        getProductApi();
    }, []);

    // Handle loading state
    if (loading) {
        return <Loading/>;
    }

    // Handle error message
    if (msg) {
        return <h2 className="text-red-700 font-bold">{msg}</h2>;
    }

    // Render the products

        return (
            <div className="row">
                {/* eslint-disable-next-line react/prop-types */}
                { arr?.length ? arr.map(prod => <Item prod={prod} key={prod._id}/>)
                    : products.map(prod => <Item prod={prod} key={prod._id}/>) }
            </div>
        );

}

export default FeatuerProduct;
