import axios from "axios";

export  async  function getProduct(){
    try {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        return data;
    }catch (err){
       console.log(err?.message)
    }
}

export  async  function getProductWithcatigory(catigoryId){
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catigoryId}`)
        return data;
    }catch (err){
        console.log(err?.message)
    }
}