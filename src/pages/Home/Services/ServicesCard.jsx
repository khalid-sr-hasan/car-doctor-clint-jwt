import React from "react";
import { Link } from "react-router-dom";

const ServicesCard = ({ service }) => {
    const { _id, img, title, price } = service;
    return (
        <div className="card bg-base-100 border shadow-xl">
            <figure className="px-4 pt-4 ">
                <img src={img} className="rounded-xl " />
            </figure>
            <div className="card-body  ">
                <h2 className="card-title">{title}</h2>
                <p className="text-orange-500">
                    <span className="font-bold">Price: $</span>
                    {price}
                </p>
                <div className="card-actions">
                    <Link to={`/checkOut/${_id}`}>
                        <button className="btn btn-primary">Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;
