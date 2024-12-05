import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import API_BASE_URL from "@/lib/config";

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Ensure your token is stored securely.
    if (!token) {
      setError("User not logged in");
      setIsLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/api/reservation", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reservations data");
        }

        const result = await response.json();
        setReservations(result); // Assuming the response is an array of reservations
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const updateReservationStatus = async (reservationId, status) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not logged in");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      status: status, // 'accepted' or 'declined'
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        API_BASE_URL + `/api/reservation/${reservationId}/status`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to update reservation status");
      }

      const result = await response.text();
      console.log(result); // You can log the result for debugging

      // If the status update is successful, update the reservation status locally
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, status: status } // Update the status of the reservation
            : reservation
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading reservations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="text-gray-600">
        <p>No reservations found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Reservations</h2>
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="border-b pb-4">
            <h3 className="text-gray-600 font-semibold">Service ID:</h3>
            <p>{reservation.service_id}</p>
            <h3 className="text-gray-600 font-semibold">Craftsman ID:</h3>
            <p>{reservation.craftsman_id}</p>
            <h3 className="text-gray-600 font-semibold">Appointment Date:</h3>
            <p>{new Date(reservation.appointment_date).toLocaleString()}</p>
            <h3 className="text-gray-600 font-semibold">Status:</h3>
            <p>{reservation.status}</p>
            <p className="text-gray-500">
              Created at: {new Date(reservation.created_at).toLocaleString()}
            </p>
            <p className="text-gray-500">
              Updated at: {new Date(reservation.updated_at).toLocaleString()}
            </p>

            <div className="mt-4 space-x-2">
              <button
                onClick={() =>
                  updateReservationStatus(reservation.id, "accepted")
                }
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  updateReservationStatus(reservation.id, "declined")
                }
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WorkerProfile = ({ worker }) => {
  const [token, setToken] = useState(null);
  const [serviceData, setServiceData] = useState({
    service_name: "Plumbing",
    service_description: "Change pipe",
    price: "500.00",
    image: null,
  });
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenFromLocalStorage = localStorage.getItem("token");
      setToken(tokenFromLocalStorage);
    }
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/api/service/my/services", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setServices(result.data);
      } else {
        setServices([]);
        console.error("Error: No valid data returned");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    if (token) {
      const fetchServices = async () => {
        try {
          const response = await fetch(
            API_BASE_URL + "/api/service/my/services",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();

          if (result.success && Array.isArray(result.data)) {
            setServices(result.data);
          } else {
            setServices([]);
            console.error("Error: No valid data returned");
          }
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };

      fetchServices();
    }
  }, [token]);

  const handleServiceCreation = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("service_name", serviceData.service_name);
    formdata.append("service_description", serviceData.service_description);
    formdata.append("price", serviceData.price);
    formdata.append("image", serviceData.image);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        API_BASE_URL + "/api/service",
        requestOptions
      );
      const result = await response.text();
      if (response.ok) {
        alert("Service added");
        setServiceData({
          service_name: "",
          service_description: "",
          price: "",
          image: null,
        });
        fetchServices();
      }
      console.log("Service Created:", result);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  if (!worker) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl text-red-600">Worker not found</h1>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 flex flex-col">
        <div className="flex items-center w-full px-4 py-4 md:px-24 md:py-24">
          {worker.image_url ? (
            <Image
              width={200}
              height={200}
              src={API_BASE_URL + "/" + worker.image_url}
              alt="Profile"
              className="object-cover rounded-xl w-48 h-48 overflow-hidden shadow-md"
            />
          ) : (
            <p>No image available</p>
          )}
          <div className="ml-6">
            <h3>
              Welcome, {worker.first_name} {worker.last_name}
            </h3>
            <p>{worker.craftsman_type}</p>
            <p>{worker.description}</p>
            <p>{worker.email}</p>
            <p>{worker.phone_number}</p>
            <button
              onClick={handleLogout}
              className="mt-2 text-gray-500 underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Services Offered
          </h2>
          {services.length === 0 ? (
            <p>No services available for this worker.</p>
          ) : (
            <ul>
              {services.map((service, index) => (
                <li key={index} className="border p-4 rounded mb-6">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {service.service_name}
                  </h4>
                  <p className="text-gray-600">{service.service_description}</p>
                  <p className="text-gray-600">Price: ${service.price}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create a New Service
          </h2>
          <form>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-gray-600 font-semibold"
                  htmlFor="service_name"
                >
                  Service Name:
                </label>
                <input
                  id="service_name"
                  type="text"
                  className="border p-2 w-full"
                  value={serviceData.service_name}
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      service_name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold"
                  htmlFor="service_description"
                >
                  Service Description:
                </label>
                <input
                  id="service_description"
                  type="text"
                  className="border p-2 w-full"
                  value={serviceData.service_description}
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      service_description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold"
                  htmlFor="price"
                >
                  Price:
                </label>
                <input
                  id="price"
                  type="text"
                  className="border p-2 w-full"
                  value={serviceData.price}
                  onChange={(e) =>
                    setServiceData({ ...serviceData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold"
                  htmlFor="image"
                >
                  Service Image:
                </label>
                <input
                  id="image"
                  type="file"
                  className="border p-2 w-full"
                  onChange={(e) =>
                    setServiceData({ ...serviceData, image: e.target.files[0] })
                  }
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={handleServiceCreation}
            >
              Create Service
            </button>
          </form>
        </div>

        <MyReservationsPage />
      </div>
    </>
  );
};

// Server-side rendering to fetch worker data
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await fetch(API_BASE_URL + `/api/craftsmen/${id}`);
    const worker = await response.json();

    if (!worker || !worker.first_name || !worker.last_name) {
      console.error("Worker not found or invalid data structure", worker);
      return {
        notFound: true,
      };
    }

    return {
      props: { worker },
    };
  } catch (error) {
    console.error("Error fetching worker data:", error);
    return {
      notFound: true,
    };
  }
}

export default WorkerProfile;
