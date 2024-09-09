import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import {useFormik} from "formik";
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "../Authcontext/Authcontext.jsx";

function Resetcode(props) {


    let {isLogged , setIsLogged} = useContext(AuthContext);

    let navigate = useNavigate();

    let [loading, setLoading] = React.useState(false);

    let [error, setError] = useState("");



    async function handleResetCode(e) {
        setLoading(true)

        try{
            setLoading(true)
            setError("")

            let {data}  =  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" ,e)
            console.log(data)
            if(data.status==="Success"){
                setLoading(false)
                navigate('/NewPassword')
            }
        }catch(error){
            console.log(error?.response?.data?.message)
            setLoading(false)
            setError(error?.response?.data?.message)

        }
    }



    let formik =  useFormik({
        initialValues: {
            resetCode:'',
        }
        ,onSubmit:handleResetCode
    })


    return (
        <div>
            <h1 className=" text-center my-4 text-green-500">Resetcode</h1>

            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                {error ? <div
                    className=" text-center    p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"><span className="font-medium">{error}</span></div> : ""}


                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode}
                           type="text" id="resetCode"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                           placeholder=" "/>
                    <label htmlFor="floating_email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reset Code</label>
                </div>





                <button type="submit"
                        className=" m-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
                    {loading ? <i className="fa-solid fa-cog fa-spin"></i> : <p>send</p>}
                </button>




            </form>

        </div>
    );
}

export default Resetcode;