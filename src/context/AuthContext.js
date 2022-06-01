import React, { useState, useEffect,createContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext=createContext();

export function AuthContextProvider({children }){
    const [cuser, setUser] = useState(null);
    const [mainLoader, setMainLoader] = useState(true);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setMainLoader(false);
      });
    }, []);

    let value={cuser}

    return(
        <AuthContext.Provider value={value}>
           {!mainLoader && children}
        </AuthContext.Provider>
    )
}
