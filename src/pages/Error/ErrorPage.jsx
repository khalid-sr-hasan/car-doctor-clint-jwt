import React from "react";
import errorAnimation from "../../assets/error-aniimation.json";
import Lottie from "lottie-react";
import { GiReturnArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <section className="flex items-center h-screen p-16  dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="w-full lg:w-8/12">
                    <button
                        onClick={() => navigate("/")}
                        className="flex gap-2 items-center mb-9 border  border-[#FF4F5B] font-bold py-2 px-5 transition-all duration-300 ease-linear hover:text-white hover:rounded-md hover:bg-[#FF4F5B]"
                    >
                        <GiReturnArrow />
                        <span>Back Home</span>
                    </button>
                    <Lottie animationData={errorAnimation}></Lottie>
                </div>
                <div className="max-w-md text-center">
                    <p className="text-2xl font-semibold md:text-3xl">
                        Sorry, we couldn't find this page.
                    </p>
                    <p className="mt-4 mb-8 dark:text-gray-600">
                        But dont worry, you can find plenty of other things on
                        our homepage.
                    </p>
                    <a
                        rel="noopener noreferrer"
                        href="#"
                        className="px-8 py-3 font-semibold rounded dark:bg-default-600 dark:text-gray-50"
                    >
                        Back to homepage
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
