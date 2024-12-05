import React from "react";

const ProfilePage = () => {
  const worker = {
    name: "John Doe",
    profession: "Electrician",
    experience: 5,
    rating: 4.8,
    contact: "john.doe@example.com",
  };

  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    address: "123 Main St, Springfield",
    orders: ["Fix plumbing issue", "Paint living room", "Install ceiling fan"],
  };

  return <div className="min-h-screen bg-gray-50 p-6 space-y-10"></div>;
};

export default ProfilePage;
