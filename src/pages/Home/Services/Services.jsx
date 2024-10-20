import React, { useEffect, useState } from "react";
import ServicesCard from "./ServicesCard";

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch("http://localhost:5000/services");
            const data = await res.json();
            setServices(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div className="my-10">
            <div className="text-center space-y-3 md:w-4/6 lg:w-3/6 mx-auto">
                <h4 className="font-bold text-3xl text-orange-500">Service</h4>
                <h2 className="font-bold text-5xl">Our Service Area</h2>
                <p className="text-base">
                    the majority have suffered alteration in some form, by
                    injected humour, or randomised words which don't look even
                    slightly believable.{" "}
                </p>
            </div>
            <div className="mt-10">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <ServicesCard key={service._id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
