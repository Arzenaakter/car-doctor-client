import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation()

  if (loading) {
   return <RotatingLines
   strokeColor="red"
   strokeWidth="5"
   animationDuration="0.75"
   width="96"
   visible={true}
 />
    
  
  }

  if (user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;
