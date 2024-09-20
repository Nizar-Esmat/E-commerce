import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useFormik} from "formik";
import Usemutationcart from "../Hooks/usemutationcart.jsx";
import {cash, payment} from "../APIS/payment.js";
import {useState} from "react";
import {toast} from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({cartId}) {

    let { mutate ,data} = Usemutationcart(payment)
    let { mutate:mutatecash ,data:cashData} = Usemutationcart(cash)

    let [flag , setflag] = useState(false)

    function handleSubmit(shippingAddress){
        if(flag){
            mutate({cartId, shippingAddress})
        }else{
            mutatecash({cartId , shippingAddress})
        }

    }

    console.log(cashData)

    //go  to all orders bage if the bayment done
    if(data?.data?.status==='success'){
        window.location.href = data?.data?.session?.url;
    }

    // check that you will bay cash
    if(cashData?.data?.status==='success'){
        toast.success("all done you will bay cash")
    }


    let  formik = useFormik({
            initialValues: {
                details: '',
                phone: '',
                city: ''
            },
            onSubmit: handleSubmit,
        }
    )
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                variant="contained"
                sx={{m:"30px"}}
                onClick={handleOpen}
               >pay cash </Button>

            <Button
                sx={{m:"30px"}}
                variant="contained"
                onClick={()=>{handleOpen(); setflag(!flag)}}
               >pay online</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>


                    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="details"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input type="text"
                                   id="details"
                                   value={formik.values.details}
                                   onChange={formik.handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                   placeholder="details" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your number</label>
                            <input type="text"
                                   id="phone"
                                   value={formik.values.phone}
                                   onChange={formik.handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="city"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                password</label>
                            <input type="text"
                                   id="city"
                                   value={formik.values.city}
                                   onChange={formik.handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"/>
                        </div>

                        <button type="submit"
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit
                        </button>
                    </form>

                </Box>
            </Modal>
        </div>
    );
}
