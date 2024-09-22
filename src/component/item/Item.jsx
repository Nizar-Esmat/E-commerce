import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import usemutationcart from "../../Hooks/usemutationcart.jsx";
import { toast } from "react-toastify";
import { addToCartApi, removCartApi } from "../../APIS/addToCart.js";
import { addToWishlist, getWishlistAPI, removWishApi } from "../../APIS/Wishlist.js";
import useQuetyCart from "../../Hooks/useQuetyCart.jsx";

function Item({ prod }) {
    const { data, isLoading, isError, error ,refetch } = useQuetyCart('getWishlistAPI', getWishlistAPI);

    const { mutate: addMutate, status: cartStatus } = usemutationcart(addToCartApi);
    const { mutate: addWishmutate, status: wishStatus } = usemutationcart(addToWishlist);
    const { mutate: deletMutate, status: deletstatus } = usemutationcart(removWishApi);

    const [wish, setWish] = useState(false);

    // Check if the product is in the wishlist
    const isInWishlist = () => {
        return data?.data.some(item => item._id === prod._id) || false;
    };

    useEffect(() => {
        // Set initial wish state
        setWish(isInWishlist());

        // Toast notifications for cart and wishlist actions
        if (cartStatus === "success") {
            toast.success("Item added to cart successfully");
        } else if (cartStatus === "error") {
            toast.error("Failed to add item to cart");
        }

        if (wishStatus === "success") {
            toast.success("Item added to wishlist successfully");
        } else if (wishStatus === "error") {
            toast.error("Failed to add item to wishlist");
        }

        if (deletstatus === "success") {
            toast.success("Item removed from wishlist successfully");
        } else if (deletstatus === "error") {
            toast.error("Failed to remove item from wishlist");
        }
    }, [cartStatus, wishStatus, deletstatus, data]);

    const handleWishToggle = () => {
        if (!wish) {
            addWishmutate(prod._id, {
                onSuccess: () => {
                    refetch(); // Refetch the wishlist after adding
                },
            });
        } else {
            deletMutate(prod._id, {
                onSuccess: () => {
                    refetch(); // Refetch the wishlist after removal
                },
            });
        }
    };


    return (
        <div className="md:w-1/4 sm:w-1/2 container relative">
            <i
                onClick={handleWishToggle}
                className={`fa-2xl fa-heart absolute top-2 left-2 ${wish ? 'fa-solid text-red-500' : 'fa-regular text-gray-500'}`}
            />
            <div className="product p-2 cursor-pointer ">
                <Link to={`/ProductDetails/${prod._id}/${prod.category._id}`}>
                    <img className="w-full" src={prod?.imageCover} alt="" />
                    <p className="text-green-700 text-center font-bold py-2">{prod?.category?.name}</p>
                    <h2 className="line-clamp-1">{prod?.title}</h2>
                    <div>
                        <p>{prod.price} EGP</p>
                        <p><i className="fa-solid fa-star text-yellow-400 line-clamp-1"></i> {prod.ratingsAverage}</p>
                    </div>
                </Link>
                <button
                    onClick={() => addMutate(prod._id)}
                    className="rounded p-2 bg-green-600 text-white btn line-clamp-1"
                    aria-label="Add item to cart"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default Item;
