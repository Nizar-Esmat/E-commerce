import axios from "axios";

export  async  function getOneProduct(prodId){
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`)
        return data;
    }catch (err){
        console.log(err?.message)
    }
}