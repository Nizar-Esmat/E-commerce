import React, { useEffect } from 'react';
import useQuetyCart from "../../Hooks/useQuetyCart.jsx";
import { clearCartApi, getcartApi, removCartApi, updataCartAPI } from "../../APIS/addToCart.js";
import Loading from "../Loading/Loading.jsx";
import usemutationcart from "../../Hooks/usemutationcart.jsx";
import { toast } from "react-toastify";
import BasicModal from "../bascisModal.jsx";
import { Helmet } from "react-helmet";

function Cart() {

    // Fetch cart data
    let { data, isLoading, isError, error } = useQuetyCart('getcartApi', getcartApi);

    // Mutation hooks for cart actions
    let { mutate: deletMutate, status: deletstatus } = usemutationcart(removCartApi);
    let { mutate: updataMutate, status: updatastatus } = usemutationcart(updataCartAPI);
    let { mutate: clearMutate, status: clearstatus } = usemutationcart(clearCartApi);

    // useEffect to handle success/error toast notifications
    useEffect(() => {
        if (deletstatus === "success") {
            toast.success("Removed successfully");
        }
        if (updatastatus === "success") {
            toast.success("Updated successfully");
        }
        if (clearstatus === "success") {
            toast.success("Cart cleared successfully");
        }
    }, [deletstatus, updatastatus, clearstatus]);

    // Loading state
    if (isLoading) {
        return <Loading />;
    }

    // Error state
    if (isError) {
        return <h2>{error.message}</h2>;
    }

    return (
        <div className="my-5 container mx-auto p-4">
            <Helmet>
                <title>Cart Component</title>
                <meta name="description" content="Helmet application" />
            </Helmet>

            <h1 className="text-2xl text-green-600 text-center my-5">
                Cart Items: {data?.numOfCartItems || 0}
            </h1>

            <h1 className="text-xl text-center my-3">
                Total Cart Price: {data?.data.totalCartPrice} EGP
            </h1>

            {/* Cart Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data?.products ? (
                    data.data.products.map((item) => (
                        <div key={item._id}
                             className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                            <img src={item?.product.imageCover || 'fallback-image-url.jpg'}
                                 className="w-full h-48 object-cover rounded-lg mb-4" alt={item.product.title}/>

                            <h3 className="text-lg font-semibold mb-2">{item?.product.title}</h3>

                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-gray-900">{item.price} EGP</span>
                                <span className="font-semibold text-gray-600">x {item?.count}</span>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <span className="text-green-600 font-bold">Total: {item.price * item.count} EGP</span>
                            </div>

                            <div className="flex justify-between items-center space-x-2">
                                <button
                                    onClick={() => updataMutate({ id: item?.product?._id, count: item?.count - 1 })}
                                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                                    -
                                </button>
                                <span>{item?.count}</span>
                                <button
                                    onClick={() => updataMutate({ id: item?.product?._id, count: item?.count + 1 })}
                                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => deletMutate(item.product._id)}
                                className="text-red-600 font-medium mt-4 block hover:underline">
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div>No items in the cart</div>
                )}
            </div>

            {/* Clear Cart Button */}
            <button
                onClick={() => clearMutate()}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300 my-3">
                Clear Cart
            </button>

            {/* Payment Buttons */}
            <div className="flex justify-center space-x-4 mt-5">
                <BasicModal cartId={data?.data._id}></BasicModal>
            </div>
        </div>
    );
}

export default Cart;
