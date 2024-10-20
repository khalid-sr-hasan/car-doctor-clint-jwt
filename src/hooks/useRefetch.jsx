import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useRefetch = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(true);

    const refetch = (link) => {
        setToggle(!toggle);
        console.log("refetch");
        // setLink(link);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/bookings?userEmail=${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setBookings(data);
                setLoading(false);
            });
        // if (setLink) {
        //     fetch(link)
        //         .then((res) => res.json())
        //         .then((data) => {
        //             setBookings(data);
        //         });
        // }
    }, [toggle, user?.email]);

    return { bookings, refetch, loading };
};

export default useRefetch;
