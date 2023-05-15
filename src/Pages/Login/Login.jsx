
import { useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Providers/AuthProvider";


const Login = () => {

  const [error,setError] = useState([])

  const {LogIn} = useContext(AuthContext)

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

    const handleLogin = event =>{
      event.preventDefault()

      const form = event.target;
      const email= form.email.value;
      const password = form.password.value;
      console.log("login",email,password);

      LogIn(email,password)
      .then(result =>{
        const loggedUser = result.user;
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Login SuccessFul',
          showConfirmButton: false,
          timer: 1500
        })
        form.reset()
        console.log(loggedUser);
        navigate(from, {replace: true})
      })
      .catch(error =>{
        setError(error.message)
      })
    }


  return (
    <div className="hero min-h-screen my-20 ">
      <div className="hero-content flex-col lg:flex-row">
        <div className="mr-20 w-1/2">
          <img src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center">Login</h1>

            <form onSubmit={handleLogin}>
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" className="btn btn-error" value="Login" />
              </div>
            </form>
            <p className="mt-4 text-center">New to Car Doctor ? <Link className="text-red-500 font-bold" to='/signup'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
