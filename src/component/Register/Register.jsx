import React, {useContext} from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Authcontext/Authcontext.jsx";
import {jwtDecode} from "jwt-decode";


function Register(props) {
    let navigate = useNavigate();
    let {isLogged} = useContext(AuthContext);
    let [loading, setLoading] = React.useState(false);
    let [error, setError] = React.useState("");

function handleRegister(e) {
    setLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" ,e)
        .then(({data}) => {
           if(data.message==='success'){
               setLoading(jwtDecode(data.token));
               setLoading(false)
               setError("")
               localStorage.setItem('token', JSON.stringify(data.token))
               navigate('/')
           }

        })
        .catch(error => {
            console.log(error?.response?.data?.message)
            setLoading(false)
        setError(error?.response?.data?.message)

        });
}



    let validationSchema = Yup.object({
        name : Yup.string().required("Name is required").min(2).max(20),
        email : Yup.string().email("Email is required").required("Email is required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/).required(),
        rePassword: Yup.string().oneOf([Yup.ref("password")]).required("Repeat password is required"),
        phone: Yup.string().matches(/^01[0-25][0-9]{8}$/ , " phone is required").required("Phone is required"),
    })
 let formik =  useFormik({
    initialValues: {
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
    },
     validationSchema
    ,onSubmit:handleRegister
})

    return (
        <div>
            <h1 className=" text-center my-4 text-green-500">Resgiter now </h1>

            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                {error ? <div className=" text-center    p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"><span className="font-medium">{error}</span></div> :  ""}

                <div className="relative   z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}
                           type="text" id="name"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                           placeholder=" "/>
                    <label htmlFor="floating_first_name"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First
                        name</label>
                </div>

                {/*    alert     */}
                {formik.errors.name && formik.touched.name ?
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        <span className="font-medium">{formik.errors.name}</span>
                    </div>
                : " "}


                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                           placeholder=" "/>
                    <label htmlFor="floating_email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                        address</label>
                </div>


                {formik.errors.email && formik.touched.email ?
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        <span className="font-medium">{formik.errors.email}</span>
                    </div>
                    : " "}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                           placeholder=" "
                    type="password"/>
                    <label htmlFor="floating_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>




                {/*    alert     */}
                {formik.errors.password && formik.touched.password ?
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        <span className="font-medium">{formik.errors.password}</span>
                    </div>
                    : " "}



                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password"
                           id="rePassword"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                           placeholder=" "/>
                    <label htmlFor="floating_repeat_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm
                        password</label>
                </div>


                {/*    alert     */}
                {formik.errors.rePassword && formik.touched.rePassword ?
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        <span className="font-medium">{formik.errors.rePassword}</span>
                    </div>
                    : " "}


                <div className=" md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone"
                               className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none    dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                               placeholder=" "/>
                        <label htmlFor="floating_phone"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phone number</label>
                    </div>

                </div>

                {/*    alert     */}
                {formik.errors.phone && formik.touched.phone ?
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        <span className="font-medium">{formik.errors.phone}</span>
                    </div>
                    : " "}

                <div className=" md:gap-6">
                </div>

                <button type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
                    {loading ? <i className="fa-solid fa-cog fa-spin"></i> : <p>submit</p>}
                </button>
            </form>

        </div>
    );
}

export default Register;