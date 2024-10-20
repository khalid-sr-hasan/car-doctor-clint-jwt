import React, { createContext, useEffect, useState } from "react";
import auth from "../Auth/firebase.init";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(user);

    const userSignUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const userProfileUpdate = (name) => {
        if (auth.currentUser) {
            setUser({ ...auth.currentUser, displayName: name });

            return updateProfile(auth.currentUser, {
                displayName: name,
            });
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const logged = { email: userEmail };
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                axios
                    .post("http://localhost:5000/jwt", logged, {
                        withCredentials: true,
                    })
                    .then((res) => console.log(res.data));
            } else {
                axios
                    .post("http://localhost:5000/logout", logged, {
                        withCredentials: true,
                    })
                    .then((res) => console.log(res.data));
            }
        });

        return () => {
            return unSubscribe();
        };
    }, []);

    const userSignOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const authInfo = {
        user,
        loading,
        userSignUp,
        userSignIn,
        userSignOut,
        userProfileUpdate,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
