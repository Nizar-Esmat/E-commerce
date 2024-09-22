import React from 'react';
import useQuetyCart from "../Hooks/useQuetyCart.jsx";
import { getDataOrderApi } from "../APIS/payment.js";

function Allorders() {
    const { data, isLoading, isError } = useQuetyCart('getDataOrderApi', getDataOrderApi);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching orders.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Orders</h1>
            {data?.data && data.data.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.data.map((order) => (
                        <li key={order._id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                            <p className="text-gray-700">Total: {order.totalOrderPrice} EGP</p>
                            <p className="text-gray-600">Status: {order.status}</p>
                            {order.cartItems && order.cartItems.length > 0 && (
                                <div className="mt-2">
                                    <h3 className="font-bold">Items:</h3>
                                    <ul className="list-disc pl-5">
                                        {order.cartItems.map((item) => (
                                            <li key={item.product._id} className="flex items-center mt-1">
                                                <img
                                                    src={item.product.imageCover || 'fallback-image-url.jpg'}
                                                    alt={item.product.title}
                                                    className="w-16 h-16 object-cover rounded mr-2"
                                                />
                                                <div>
                                                    <p>{item.product.title}</p>
                                                    <p>Price: {item.price} EGP</p>
                                                    <p>Quantity: {item.count}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No orders found.</div>
            )}
        </div>
    );
}

export default Allorders;
