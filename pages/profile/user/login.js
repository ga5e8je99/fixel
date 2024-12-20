import React, { useState } from "react";
import { useRouter } from "next/router"; // Next.js useRouter hook
import API_BASE_URL from "@/lib/config";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // Hook to navigate after login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Prepare the data to send in the POST request
    const requestData = {
      email: formData.email,
      password: formData.password,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(requestData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // Make the API request
    fetch(API_BASE_URL + "/api/login", requestOptions)
      .then((response) => response.json()) // Parse the JSON response
      .then((result) => {
        if (result.message === "Login successful") {
          // Save the token and user data to localStorage
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));

          if (result.user.craftsmanId) {
            router.push(`/profile/worker/${result.user.user_id}`);
          } else {
            router.push(`/profile/user/${result.user.user_id}`);
          }
        } else {
          setError(result.message || "Login failed.");
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-600 text-center">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a
            href="/profile/worker/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
