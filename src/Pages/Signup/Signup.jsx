
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import login from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Providers/AuthProvider";


const Signup = () => {
  const [error,setError] = useState([])

  const {CreateUser} = useContext(AuthContext)

    const handleSignUp = event =>{
        event.preventDefault()

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log("signup",email,password,name);
        setError('')

        if(password.length > 6){
          setError("Password should be 6 digit")
          return;
        }


        CreateUser(email,password)
        .then(result =>{
          const createUser = result.user;
          console.log(createUser);
          
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Sign Up Successful',
            showConfirmButton: false,
            timer: 1500
          })



        })
        .catch(error =>{
          setError(error.message)
          console.log(error);
        })
    

       
    }
    return (
        <div className="hero min-h-screen  my-20">
      <div className="hero-content flex-col lg:flex-row">
        <div className="mr-20 w-1/2">
          <img src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>

            <form onSubmit={handleSignUp}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name" required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email" required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password" required
                  className="input input-bordered"
                />
                <p className="text-red-400">{error}</p>
               
              </div>
              <div className="form-control mt-6">
                <input type="submit" className="btn btn-error" value="SignUp" />
              </div>
            </form>
            <p className="mt-4 text-center">Already have an account  ? <Link className="text-red-500 font-bold" to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Signup;