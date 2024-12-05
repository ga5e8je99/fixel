import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API_BASE_URL from "@/lib/config";
import Image from "next/image";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch services from API
    fetch("https://fixly-umber.vercel.app/fixly/api/product/getall", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        return response.json(); // Parsing the response to get the data
      })
      .then((data) => { // Now 'data' holds the response data
        console.log(data);
        // Adjusting the condition to check the response format properly
        if (data.status === "success" && data.data && data.data.category) {
          setServices([data.data]); // Set the fetched data into state (wrapped inside an array)
        } else {
          console.error("Unexpected response format:", data);
          setServices([]); // Clear services if format is incorrect
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading services...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <div className="bg-gray-50 flex flex-col">
        {/* Hero Section */}
        <div className="relative bg-[url('/worker-bg.jpg')] bg-cover bg-center h-[400px]">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="max-w-lg text-white space-y-6 flex flex-col md:items-start md:text-start items-center text-center" style={{ position: 'relative', textAlign: 'center' }}>
              <h1 className="md:text-5xl text-4xl font-bold mb-0" style={{marginLeft:'93px'}}>
                Our Services
              </h1>
              <p>"We offer high-quality web development services tailored to your business needs."</p>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 0  */}
          <div
    key={0}  // Using the category ID for the key prop
    className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl text-left"
  >
    <img
      src={"https://media.istockphoto.com/id/1347150429/photo/professional-mechanic-working-on-the-engine-of-the-car-in-the-garage.jpg?s=612x612&w=0&k=20&c=5zlDGgLNNaWsp_jq_L1AsGT85wrzpdl3kVH-75S-zTU="}  // Using the first image from the array
      width={500}
      height={50}
      className="w-full h-44 bg-cover rounded-lg"
      alt={'Fied car'}  // Using the category title for alt text
    />
    <h2 className="text-xl font-semibold text-gray-800 my-2">
      {'fixed and chick car '} {/* Displaying the description */}
    </h2>
    <p className="text-black mb-2">{'mechanical'}</p> {/* Displaying the name */}
    <p className="text-gray-700 my-1">
      Price: <span className="text-black">{"200$"}</span>
    </p>
    <p className="text-gray-700 my-1">
      Craftsman: <span className="text-black">{'fixed car'}</span> {/* Displaying the title */}
    </p>
    <button
      onClick={() => {
        router.push("/services/" + 0);  // Using category ID for navigation
      }}
      className="bg-[#1b224f] text-white w-full mt-2 py-2 rounded-lg"
    >
      Make A Reservation
    </button>
  </div>
  {/* 1 */}
  <div
    key={1}  // Using the category ID for the key prop
    className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl text-left"
  >
    <img
      src={"https://media.istockphoto.com/id/673723668/photo/handsome-auto-service-workers.jpg?s=612x612&w=0&k=20&c=uSQVOvjatxrv2lujk1ydApTNOsyPfsHApKkZaY8Sq9M="}  // Using the first image from the array
      width={500}
      height={50}
      className="w-full h-44 bg-cover rounded-lg"
      alt={'Fied car'}  // Using the category title for alt text
    />
    <h2 className="text-xl font-semibold text-gray-800 my-2">
      {'fixed and chick car '} {/* Displaying the description */}
    </h2>
    <p className="text-black mb-2">{'mechanical'}</p> {/* Displaying the name */}
    <p className="text-gray-700 my-1">
      Price: <span className="text-black">{"200$"}</span>
    </p>
    <p className="text-gray-700 my-1">
      Craftsman: <span className="text-black">{'fixed car'}</span> {/* Displaying the title */}
    </p>
    <button
      onClick={() => {
        router.push("/services/" + 1);  // Using category ID for navigation
      }}
      className="bg-[#1b224f] text-white w-full mt-2 py-2 rounded-lg"
    >
      Make A Reservation
    </button>
  </div>
  {/* 2 */}
  <div
    key={2}  // Using the category ID for the key prop
    className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl text-left"
  >
    <img
      src={"https://media.istockphoto.com/id/522394158/photo/car-service-procedure.jpg?s=612x612&w=0&k=20&c=SXPyg7yMw0Uc4LuI59lchMouvjJ3z6r5oNKO7mdnHCc="}  // Using the first image from the array
      width={500}
      height={50}
      className="w-full h-44 bg-cover rounded-lg"
      alt={'Fied car'}  // Using the category title for alt text
    />
    <h2 className="text-xl font-semibold text-gray-800 my-2">
      {'fixed and chick car '} {/* Displaying the description */}
    </h2>
    <p className="text-black mb-2">{'mechanical'}</p> {/* Displaying the name */}
    <p className="text-gray-700 my-1">
      Price: <span className="text-black">{"200$"}</span>
    </p>
    <p className="text-gray-700 my-1">
      Craftsman: <span className="text-black">{'fixed car'}</span> {/* Displaying the title */}
    </p>
    <button
      onClick={() => {
        router.push("/services/" + 2);  // Using category ID for navigation
      }}
      className="bg-[#1b224f] text-white w-full mt-2 py-2 rounded-lg"
    >
      Make A Reservation
    </button>
  </div>
  {/* 3 */}
  <div
    key={3}  // Using the category ID for the key prop
    className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl text-left"
  >
    <img
      src={"https://media.istockphoto.com/id/614347236/photo/woman-phoning-for-help-after-car-windshield-has-broken.jpg?s=612x612&w=0&k=20&c=54H3RB79IdXvyhBVbuT9R-cczCeFwIb48_RMzvqUQIo="}  // Using the first image from the array
      width={500}
      height={50}
      className="w-full h-44 bg-cover rounded-lg"
      alt={'Fied car'}  // Using the category title for alt text
    />
    <h2 className="text-xl font-semibold text-gray-800 my-2">
      {'fixed and chick car '} {/* Displaying the description */}
    </h2>
    <p className="text-black mb-2">{'mechanical'}</p> {/* Displaying the name */}
    <p className="text-gray-700 my-1">
      Price: <span className="text-black">{"200$"}</span>
    </p>
    <p className="text-gray-700 my-1">
      Craftsman: <span className="text-black">{'fixed car'}</span> {/* Displaying the title */}
    </p>
    <button
      onClick={() => {
        router.push("/services/" + 3);  // Using category ID for navigation
      }}
      className="bg-[#1b224f] text-white w-full mt-2 py-2 rounded-lg"
    >
      Make A Reservation
    </button>
  </div>
  {/* 4 */}
  <div
    key={4}  // Using the category ID for the key prop
    className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl text-left"
  >
    <img
      src={"https://media.istockphoto.com/id/1486501215/photo/mechanic-garage-auto-workshop-team-working-service-repair-fix-damaged-front-bumper-accident.jpg?s=612x612&w=0&k=20&c=BDi13tphOW1FiRyjZF2Ao309r3YYUcYuvdtsU1UWXC4="}  // Using the first image from the array
      width={500}
      height={50}
      className="w-full h-44 bg-cover rounded-lg"
      alt={'Fied car'}  // Using the category title for alt text
    />
    <h2 className="text-xl font-semibold text-gray-800 my-2">
      {'fixed and chick car '} {/* Displaying the description */}
    </h2>
    <p className="text-black mb-2">{'mechanical'}</p> {/* Displaying the name */}
    <p className="text-gray-700 my-1">
      Price: <span className="text-black">{"200$"}</span>
    </p>
    <p className="text-gray-700 my-1">
      Craftsman: <span className="text-black">{'fixed car'}</span> {/* Displaying the title */}
    </p>
    <button
      onClick={() => {
        router.push("/services/" + 4);  // Using category ID for navigation
      }}
      className="bg-[#1b224f] text-white w-full mt-2 py-2 rounded-lg"
    >
      Make A Reservation
    </button>
  </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
