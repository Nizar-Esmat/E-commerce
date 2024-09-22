import axios from "axios";

let token = localStorage.getItem("token");
if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);  // This removes the first and last character (quotes)
}

export function payment({cartId, shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` ,
        {shippingAddress}, {headers:{token}})
}

export function cash({cartId, shippingAddress}){

    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,
        {shippingAddress}, {headers:{token}})
}


export function getDataOrderApi({ cartId, shippingAddress }) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders` ,{headers:{token}});
}
