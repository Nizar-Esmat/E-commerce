import axios from "axios";

export  async  function getCategories(){
    try {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/Categories')
        return data;
    }catch (err){
        console.log(err?.message)
    }
}