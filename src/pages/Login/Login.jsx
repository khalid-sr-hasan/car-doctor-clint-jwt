import loginImg from "../../assets/images/login/login.svg";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { userSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleSignIn = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        userSignIn(email, password)
            .then((result) => {
                console.log(result.user);

                if (location?.state === "/allBookings") {
                    navigate("/");
                } else {
                    navigate(location?.state ? location.state : "/", {
                        replace: true,
                    });
                }

                // const user = { email };
                // axios
                //     .post("http://localhost:5000/jwt", user, {
                //         withCredentials: true,
                //     })
                //     .then((res) => {
                //         if (res.data.success) {
                //             navigate(location?.state ? location.state : "/", {
                //                 replace: true,
                //             });
                //         }
                //         console.log(res.data);
                //     });
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:mr-12 lg:text-left w-1/2">
                    <img src={loginImg} alt="" />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignIn} className="card-body">
                        <h1 className="text-3xl text-center font-bold">
                            Sign in now!
                        </h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="email"
                                name="email"
                                className="input input-bordered"
                                // required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                autoComplete="password"
                                className="input input-bordered"
                                // required
                            />
                            <label className="label justify-end">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign In</button>
                        </div>
                        <p className="text-center mt-6">
                            New to car doctor ?{" "}
                            <Link
                                to="/register"
                                className="text-orange-500 font-semibold"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
