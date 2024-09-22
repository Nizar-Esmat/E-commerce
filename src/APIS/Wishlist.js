import axios from "axios";

let token = localStorage.getItem("token");
if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);  // This removes the first and last character (quotes)
}

export function addToWishlist(productId) {
    console.log(token)
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" ,
        {productId}, {
        headers : {token}
    })
}

export function getWishlistAPI(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist'
        ,
        {
            headers  :{
                token
            }
        }
    )
}

export function removWishApi(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
        ,
        {
            headers  :{
                token
            }
        }
    )
}
