import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from '../../../assets/logo.svg'
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {

  const {user,LogOut} = useContext(AuthContext)


  const handleLogOut =()=>{
    LogOut()
    .then(() =>{
      Swal.fire('LogOut')
      // localStorage.removeItem('car-access-token')
    })
    .catch(error =>{
      console.log(error);
    })
  }

    const navItems = <>
    <li>
        <Link to='/'>Home</Link>
        
    </li>
    <li>
         <Link to='/'>About</Link>
    </li>
    <li>
        <Link to='/'>Services</Link>
    </li>
    <li>
        <Link to='/'>Blog</Link>
    </li>
    <li>
    {user ?.email? 
    <>
    <Link to='/bookings'>My Booking</Link>
    <button className="" onClick={handleLogOut} >LogOut</button>
    </> 
       
    : <Link className="" to='/login'>Login</Link> }
    </li>

    </>

  return (
    <div className="navbar bg-base-100 h-28 mb-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {navItems}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case text-xl">
            <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-outline btn-error">Appointment</button>
        
      </div>
    </div>
  );
};

export default Navbar;
