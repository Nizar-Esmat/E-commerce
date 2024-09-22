import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import logo from "../../assets/finalProject assets/freshcart-logo.svg";
import {AuthContext} from "../Authcontext/Authcontext.jsx";
import useQuetyCart from "../../Hooks/useQuetyCart.jsx";
import {getcartApi} from "../../APIS/addToCart.js";

const Navbar = () => {
    let { data, isLoading, isError, error } = useQuetyCart('getcartApi', getcartApi);

    let navigate = useNavigate();
    let {isLogged , setIsLogged} = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };


    function logout(){
        localStorage.removeItem("token");
        setIsLogged(false)
        navigate('/login')
    }
    return (
        <nav className="text-white shadow-lg bg-gray-800">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo and Main Navigation */}
                <div className="flex items-center">
                    <img src={logo} className="h-10 mr-4" alt="logo" />
                    {isLogged ?
                        <ul className="hidden md:flex space-x-6 relative">
                        <li>
                            <NavLink to="/" className="hover:text-green-400">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Products" className="hover:text-green-400">
                                Products
                            </NavLink>
                        </li>

                            <li>
                            <NavLink to="/Brand" className="hover:text-green-400">
                                Brand
                            </NavLink>
                        </li>
                            <li>
                                <NavLink to="/WishList" className="hover:text-green-400">
                                    WishList
                                </NavLink>
                            </li>
                    </ul>
                        :
                        " "
                    }
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-400 focus:outline-none"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                {/* Login/Register and Social Links */}
                <div className="hidden md:flex items-center space-x-4">

                    {isLogged ?
                        <ul className="flex space-x-6">
                            <li>
                                <NavLink to="/Cart" className="hover:text-green-400 flex items-center">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className="bg-green-500 text-white ml-2 px-2 py-1 rounded-full text-sm font-bold">{data?.numOfCartItems || 0}</span>
                                </NavLink>
                            </li>

                            <li>
                                <div className="flex items-center space-x-6">
                                    <p onClick={logout} className="block hover:text-green-400 cursor-pointer">log
                                        out</p>
                                    <p className="placeholder-green-600 hover:text-green-400 "> {isLogged ?
                                        <p>Hi {isLogged.name}</p> : " "} </p>
                                </div>
                            </li>
                        </ul>
                        :
                        <ul className="flex space-x-6">
                            <li>
                                <NavLink to="/Login" className="hover:text-green-400">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Register" className="hover:text-green-400">
                                    Register
                                </NavLink>
                            </li>


                        </ul>
                    }

                    <div className="flex space-x-3">
                        <a href="https://facebook.com" className="fa-brands fa-facebook hover:text-green-400"></a>
                        <a href="https://twitter.com" className="fa-brands fa-twitter hover:text-green-400"></a>
                        <a href="https://google.com" className="fa-brands fa-google hover:text-green-400"></a>
                        <a href="https://instagram.com" className="fa-brands fa-instagram hover:text-green-400"></a>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-gray-800 text-center">

                        {isLogged ?
                            <ul className="p-4 space-y-4">
                                <li>
                                    <NavLink to="/" className="block hover:text-green-400">
                                        Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/Products" className="block hover:text-green-400">
                                        Products
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/Cart" className="block hover:text-green-400">
                                        Cart
                                    </NavLink>
                                </li>


                                <li>
                                    <NavLink to="/Brand" className="block hover:text-green-400">
                                        Brand
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/WishList" className="hover:text-green-400">
                                        WishList
                                    </NavLink>
                                </li>


                                <li>
                                    <div onClick={logout} className="block hover:text-green-400 cursor-pointer">log
                                        out
                                    </div>
                                </li>
                            </ul>
                            :
                            <ul className="p-4 space-y-4">
                                <li>
                                    <NavLink to="/Login" className="block hover:text-green-400">
                                    Login
                            </NavLink>
                            </li>

                            <li>
                            <NavLink to="/Register" className="block hover:text-green-400">
                            Register
                            </NavLink>
                            </li>

                                </ul>
                        }


                </div>
            )}
        </nav>
    );
};

export default Navbar;
