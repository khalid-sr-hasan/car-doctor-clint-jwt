import React, { useEffect, useState } from "react";
import TableRow from "../../components/TableRow/TableRow";
import useRefetch from "../../hooks/useRefetch";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllBookings = () => {
    const { user } = useAuth();
    const secureAxios = useAxiosSecure();

    // const { bookings, refetch, loading } = useRefetch();

    // if (loading) {
    //     return <p>start Loading...</p>;
    // }

    const [bookings, setBookings] = useState([]);

    const url = `/bookings?userEmail=${user?.email}`;
    useEffect(() => {
        secureAxios.get(url).then((res) => setBookings(res.data));
    }, [url, secureAxios]);

    const handleDeleteService = (id) => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });

                            const remaining = bookings.filter(
                                (item) => item._id !== id
                            );
                            setBookings(remaining);
                        }
                        // refetch();
                    });
            }
        });
    };

    const handleConfirmed = (id) => {
        console.log("c", id);

        fetch(`http://localhost:5000/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ status: "confirmed" }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Order Confirmed!",
                        text: "Your booking has been complete.",
                        icon: "success",
                    });

                    const remaining = bookings.filter(
                        (item) => item._id !== id
                    );
                    const update = bookings.find((item) => item._id === id);
                    update.status = "confirmed";
                    // console.log("update", update);
                    const newBooking = [update, ...remaining];
                    setBookings(newBooking);
                    // refetch();
                }
                console.log(data);
            });
    };

    return (
        <div>
            <h1 className="font-bold mb-5 text-3xl">
                Total Bookings :{" "}
                <span className="text-orange-500"> {bookings.length}</span>
            </h1>
            <div className="overflow-x-auto border my-8">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-green-100 text-[#252525] text-base ">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, idx) => (
                            <TableRow
                                key={booking._id}
                                booking={booking}
                                bookings={bookings}
                                handleDeleteService={handleDeleteService}
                                idx={idx}
                                // setBookings={setBookings}
                                // refetch={refetch}
                                handleConfirmed={handleConfirmed}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBookings;
