import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const SocialLogin = () => {

    const {googleLogin} = useContext(AuthContext)

    const handleGoogleLogin =()=>{
        googleLogin()
        .then(result =>{
            const googleUser = result.user;
            console.log(googleUser);
        })
        .catch(err =>{
            console.log(err);
        })

    }



  return (
    <div>
      <div className="divider">OR</div>
      <div className="text-center">
        <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
         G
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
