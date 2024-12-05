import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    // Simulate form submission (replace with actual API logic)
    console.log("Contact Form Data: ", formData);
    setSuccess("Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="h-auto items-center justify-center bg-gray-50">
        <div className="flex md:flex-row flex-col w-full h-[600px]">
          <div className="md:w-1/2 w-full h-[600px] flex justify-center items-center">
            <div className="w-full max-w-md p-8">
              <h1 className="text-2xl font-bold text-left text-gray-800 mb-2">
                Contact Us
              </h1>
              <p className="mb-6">
                Send us an email & we will reach you shortly
              </p>
              {error && (
                <div className="mb-4 text-sm text-red-600 text-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 text-sm text-green-600 text-center">
                  {success}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>

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

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="relative w-1/2 bg-green-50 bg-[url('/login-bg.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-blue-900 bg-opacity-0"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
