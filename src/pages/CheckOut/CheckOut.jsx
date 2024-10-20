import { useLoaderData, useNavigate } from "react-router-dom";
import checkOut from "../../assets/images/checkout/checkout.png";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const CheckOut = () => {
    const data = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    // console.log(data);

    const handleBookService = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const serviceDate = form.serviceDate.value;
        const userEmail = form.email.value;
        const servicePrice = form.servicePrice.value;
        const productDescription = form.productDescription.value;
        const serviceName = data?.title;
        const serviceImage = data?.img;
        const bookingInfo = {
            serviceDate,
            name,
            userEmail,
            productDescription,
            servicePrice,
            serviceName,
            serviceImage,
        };
        console.log(bookingInfo);

        fetch(`http://localhost:5000/bookings`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(bookingInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Booking Complete!",
                        text: "Please confirm the order!",
                        icon: "success",
                    });
                }
                navigate(-1);
                console.log(data);
            });
    };

    return (
        <div>
            {/* Banner Section */}
            <div className="relative h-64">
                {/* Background Image */}
                <img
                    src={checkOut}
                    alt="Checkout Banner"
                    className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Text Section */}
                <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-8">
                    <h1 className="text-4xl font-bold">Check Out</h1>

                    {/* Breadcrumb */}
                    <div className="mt-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                            Home/Checkout
                        </span>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="py-16 flex items-center justify-center ">
                <div className="w-full border max-w-4xl p-16 bg-white shadow-md rounded-lg">
                    <div className="text-center pb-6 ">
                        <h3 className="font-bold text-2xl">
                            Booking Service :{" "}
                            <span className="text-orange-400">
                                {data.title}
                            </span>
                        </h3>
                    </div>
                    <form
                        onSubmit={handleBookService}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* Service Name */}
                        <div className="form-group">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2"
                                htmlFor="name"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={user?.displayName}
                                placeholder="Service Name"
                                className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Service Price */}
                        <div className="form-group">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2"
                                htmlFor="servicePrice"
                            >
                                Service Price
                            </label>
                            <input
                                type="text"
                                id="servicePrice"
                                name="servicePrice"
                                defaultValue={`$ ${data.price}`}
                                placeholder="Service Price"
                                className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="form-group md:col-span-1">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                defaultValue={user?.email}
                                placeholder="Email"
                                className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Date Input (Service Type replaced by Date) */}
                        <div className="form-group md:col-span-1">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2"
                                htmlFor="serviceDate"
                            >
                                Service Date
                            </label>
                            <input
                                type="date"
                                id="serviceDate"
                                name="serviceDate"
                                className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Product Description */}
                        <div className="form-group md:col-span-2">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2"
                                htmlFor="productDescription"
                            >
                                Product Description
                            </label>
                            <textarea
                                id="productDescription"
                                name="productDescription"
                                placeholder="Product Description"
                                className="input w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-colors duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
