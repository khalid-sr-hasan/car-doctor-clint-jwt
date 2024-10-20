import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const secureAxios = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { userSignOut } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     secureAxios.interceptors.response.use(
    //         (res) => {
    //             console.log(res);
    //         },
    //         (error) => {
    //             console.log(error.response);
    //         }
    //     );
    // }, []);

    useEffect(() => {
        secureAxios.interceptors.response.use(
            (res) => {
                return res;
            },
            (error) => {
                console.log(error.response);
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    userSignOut().then(() => {
                        navigate("/login");
                    });
                }
            }
        );
    }, []);

    return secureAxios;
};

export default useAxiosSecure;
