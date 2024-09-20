
//add to cart
import axios from "axios";

let token = localStorage.getItem("token");
if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);  // This removes the first and last character (quotes)
}



export function addToCartApi(productId) {

    return axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
            headers: {
                token
            }
        }
    );
}

// get cart
export function getcartApi(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart'
        ,
        {
            headers  :{
                token
            }
        }
        )
}

//remove item

export function removCartApi(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
        ,
        {
            headers  :{
                token
            }
        }
    )
}


export function updataCartAPI({id, count}) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
        ,{count},
        {
            headers  :{
                token
            }
        }
    )
}


export function clearCartApi() {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`
        ,
        {
            headers  :{
                token
            }
        }
    )
}