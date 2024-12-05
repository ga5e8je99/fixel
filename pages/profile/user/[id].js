import API_BASE_URL from "@/lib/config";
import Image from "next/image";
import React, { useState, useEffect } from "react";

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
        const response = await fetch(
          API_BASE_URL +
            "/api/reservation?page=1&limit=2&status=pending&sort=asc",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the request headers
            },
          }
        );

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

  const handleCancelReservation = async (reservationId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not logged in");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`); // Use the token for authorization

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        API_BASE_URL + `/api/reservation/${reservationId}/cancel`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to cancel reservation");
      }

      const result = await response.text();
      console.log(result); // You can log the result for debugging

      // If the cancelation is successful, update the reservation status locally
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.id !== reservationId
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
            <button
              onClick={() => handleCancelReservation(reservation.id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel Reservation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Ensure your token is stored securely.
    if (!token) {
      setError("User not logged in");
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/api/myprofile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await response.json();
        setProfile(result.user); // Set the user object from the response
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
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

  if (!profile) {
    return (
      <div className="text-gray-600">
        <p>No profile data found.</p>
      </div>
    );
  }

  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <div className="bg-gray-50 flex flex-col">
        <div className="flex items-center w-full px-4 py-4 md:px-24 md:py-24">
          {profile.image_url ? (
            <Image
              width={200}
              height={200}
              src={API_BASE_URL + "/" + profile.image_url}
              alt="Profile"
              className="object-cover rounded-xl w-48 h-48 overflow-hidden shadow-md"
            />
          ) : (
            <p>No image available</p>
          )}
          <div className="ml-6">
            <h3>
              Welcome, {profile.first_name} {profile.last_name}
            </h3>
            <p>{profile.email}</p>
            <p>{profile.phone_number}</p>
            <button
              onClick={handleLogout}
              className="mt-2 text-gray-500 underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <h3>My Reservations</h3>
      </div>
    </>
  );
};

export default MyProfilePage;
