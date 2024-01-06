import React from "react";
import { Link,useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = (props)=> {
  let histroy = useHistory()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    histroy.push('/login')
    props.showAlert("Logout  successfully", "Success");

  }
  let location = useLocation();
  
  return (
    <div>
      <nav className="bg-white flex items-center sticky border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center ml-[-3px] mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>
           
          <div
            className=" hidden w-full md:flex md:w-auto md:order-1 mx-6"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0  ${location.pathname==="/"? "md:dark:text-blue-500":""}`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0  ${location.pathname==="/about"? "md:dark:text-blue-500":""}`}
                >
                  About
                </Link>
              </li>
             
            </ul>
          </div>
        </div>
          {!localStorage.getItem('token')?<div className="mx-2 space-x-3">
          <Link
          role="button"
          to = "/login"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Login
          </Link>
          <Link
          role="button"
          to = "/signup"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Signup
          </Link>
          </div>:<buttone onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2">Logout</buttone>}
      </nav>
    </div>
  );
}

export default Navbar;
