import React from "react";
import { FaUserTie, FaUsers } from "react-icons/fa";

const Join = () => {
  return (
    <div className="min-h-[350px] flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full p-6">
        {/* Worker Card */}
        <a
          href="/profile/worker/register"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center"
        >
          <FaUserTie className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            I am a Worker
          </h2>
          <p className="text-gray-600">
            Join as a skilled worker or artisan to connect with potential
            employers.
          </p>
        </a>

        <a
          href="/profile/user/register"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center"
        >
          <FaUsers className="text-4xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            I am a User
          </h2>
          <p className="text-gray-600">
            Join as a user to find skilled workers or artisans for your needs.
          </p>
        </a>
      </div>
    </div>
  );
};

export default Join;
