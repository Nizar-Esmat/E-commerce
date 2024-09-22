import React, { useEffect } from 'react';
import useQuetyCart from "../Hooks/useQuetyCart.jsx";
import {getWishlistAPI, removWishApi} from "../APIS/Wishlist.js";
import usemutationcart from "../Hooks/usemutationcart.jsx";
import { toast } from "react-toastify";

function WishList(props) {
    const { data, isLoading, isError, error, refetch } = useQuetyCart('getWishlistAPI', getWishlistAPI);
    const { mutate: deletMutate, status: deletstatus } = usemutationcart(removWishApi);

    useEffect(() => {
        if (deletstatus === "success") {
            toast.success("Item removed from wishlist successfully");
            refetch();
        } else if (deletstatus === "error") {
            toast.error("Failed to remove item from wishlist");
        }
    }, [deletstatus, refetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h1 className="text-center">Wishlist</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6 text-center">
                {data?.data && data.data.length > 0 ? (
                    data.data.map((item) => (
                        <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <img src={item?.imageCover || 'fallback-image-url.jpg'} className="w-full h-48 object-cover rounded-lg mb-4" alt={item.title} />
                            <h3 className="text-lg font-semibold mb-2">{item?.title}</h3>
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-gray-900">{item.price} EGP</span>
                            </div>
                            <button
                                onClick={() => deletMutate(item._id)}
                                className="text-red-600 font-medium mt-4 block hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div>No items in the wishlist</div>
                )}
            </div>
        </>
    );
}

export default WishList;
