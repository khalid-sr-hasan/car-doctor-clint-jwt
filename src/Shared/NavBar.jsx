import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const { user, userSignOut } = useAuth();

    const handleLogOut = () => {
        userSignOut()
            .then(() => console.log("log out success"))
            .catch((err) => console.log(err.message));
    };

    const navItem = (
        <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/service">Service</Link>
            </li>
            <li>
                <Link to="/blog">Blog</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
            {user?.email ? (
                <li>
                    <Link to="/allBookings">My Bookings</Link>
                </li>
            ) : null}
        </>
    );

    return (
        <div className="navbar shadow-lg mb-5 bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm font-semibold dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {navItem}
                    </ul>
                </div>
                <Link className="">
                    <img src={logo} alt="" />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal font-bold px-1">
                    {navItem}
                </ul>
            </div>

            <div className="navbar-end gap-3">
                {user ? user.displayName : ""}
                {user?.email ? (
                    <button onClick={handleLogOut} className="btn">
                        log Out
                    </button>
                ) : (
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
