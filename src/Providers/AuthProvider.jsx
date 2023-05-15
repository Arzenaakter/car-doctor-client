import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useEffect } from "react";

export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading,setLoading] = useState (true)

    const CreateUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }


    const LogIn =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }


    useEffect(()=>{
     const unSubscribe = onAuthStateChanged(auth,currentUser =>{
        setLoading(false)
            setUser(currentUser)
        })
        return ()=>{
            return unSubscribe()
        }

    },[])


    const LogOut =()=>{
        setLoading(true)
        return signOut(auth)
    }


    const authInfo ={
        user,
        loading,
        CreateUser,
        LogIn,
        LogOut,

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;