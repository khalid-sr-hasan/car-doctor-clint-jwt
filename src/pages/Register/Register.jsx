import loginImg from "../../assets/images/login/login.svg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const { userSignUp, userProfileUpdate } = useAuth();

    const handleSignUp = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        userSignUp(email, password)
            .then((result) => {
                console.log("user register success");
                userProfileUpdate(name);
            })
            .catch((err) => console.log(err.message));
    };
    return (
        <div className="hero  min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:mr-12 lg:text-left w-1/2">
                    <img src={loginImg} alt="" />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignUp} className="card-body">
                        <h1 className="text-3xl text-center font-bold">
                            Sign up now!
                        </h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="name"
                                name="name"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="email"
                                name="email"
                                className="input input-bordered"
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
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type="password"
                                placeholder="confirm password"
                                name="confirmPassword"
                                autoComplete="password"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        <p className="text-center mt-6">
                            Have an account ?{" "}
                            <Link
                                to="/login"
                                className="text-orange-500 font-semibold"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
