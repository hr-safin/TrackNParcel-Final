import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
import img from "./animation.gif"
import useAxiosPublic from '../Hook/useAxiosPublic';
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

    const auth = getAuth(app)

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState("loading")
    const provider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const googleLogin = () => {
        setIsLoading(true)
        return signInWithPopup(auth, provider )
    }

    const logOut = () => {
        setIsLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
             console.log(currentUser)
            if(currentUser){
            const userInfo = {email : currentUser.email}
            axiosPublic.post("/jwt", userInfo)
            .then(res => {
                console.log(res.data)
                if(res.data.token){
                    localStorage.setItem("access-token", res.data.token)
                    setIsLoading(false)
                }})
            }
            else{
                localStorage.removeItem("access-token")
                setIsLoading(false)
            }

                
                
            
            
        })

        return () => {
            unSubscribe()
            
        }
    }, [])

    // const profileUpdate = (name, photo) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName : name,  
    //         photoURL : photo,
    //     })
    // }

    const userInfo = {
        user,
        setUser,
        isLoading,
        createUser,
        googleLogin,
        signIn,
        logOut,
        
    }




    



    return isLoading ? <div className=' flex h-screen justify-center items-center'> 
        <img className=' lg:w-[15%]'  src={img} alt="" />
    </div> : (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;