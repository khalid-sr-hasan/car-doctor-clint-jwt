import React from "react";
import person from "../../../assets/images/about_us/person.jpg";
import parts from "../../../assets/images/about_us/parts.jpg";

const About = () => {
    return (
        <div className="hero my-20 lg:my-0 min-h-screen ">
            <div className="flex gap-10 flex-col lg:flex-row">
                <div className="relative lg:w-1/2">
                    <img className="w-10/12 rounded-xl" src={person} alt="" />
                    <img
                        className="absolute w-7/12 border-8 border-white rounded-xl right-6 top-1/3"
                        src={parts}
                        alt=""
                    />
                </div>

                <div className="space-y-6  lg:w-1/2">
                    <h4 className="text-3xl font-bold text-orange-500">
                        About Us
                    </h4>
                    <h2 className="text-5xl font-bold">
                        We are qualified & of experience in this field
                    </h2>
                    <p className="">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable.
                    </p>
                    <p>
                        the majority have suffered alteration in some form, by
                        injected humour, or randomised words which don't look
                        even slightly believable.{" "}
                    </p>
                    <button className="btn btn-warning">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;
