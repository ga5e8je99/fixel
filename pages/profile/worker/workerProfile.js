import React, { useState } from 'react';

const WorkerProfile = () => {
  // بيانات العامل
  const worker = {
    id: 1,
    name: 'John Doe',
    profession: 'Web Developer',
    rating: 4.8,
    age: 30,
    totalRequests: 25,
  };

  // تفاصيل الطلبات
  const orders = [
    {
      id: 1,
      location: 'New York',
      request: 'Build a website',
      user: 'Alice Smith',
    },
    {
      id: 2,
      location: 'Los Angeles',
      request: 'Fix website bugs',
      user: 'Bob Johnson',
    },
    {
      id: 3,
      location: 'San Francisco',
      request: 'Design a logo',
      user: 'Charlie Brown',
    },
    // يمكن إضافة المزيد من الطلبات
  ];

  const [approvalStatus, setApprovalStatus] = useState({});

  const handleApproval = (id) => {
    setApprovalStatus((prevStatus) => ({
      ...prevStatus,
      [id]: 'approved',
    }));
  };

  const handleRejection = (id) => {
    setApprovalStatus((prevStatus) => ({
      ...prevStatus,
      [id]: 'rejected',
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* معلومات العامل */}
      <div style={{width:'100%',display:'flex',justifyContent:'center',marginBottom:'50px'}}>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100"
      height="100"
      viewBox="0 0 512.024 512.024"
      style={{ enableBackground: 'new 0 0 512 512' }}
      xmlSpace="preserve"
    >
      <g transform="matrix(1, 0, 0, 1, 0, 0)">
        <path
          d="M357.802 392.31c-28.225 21.688-63.524 34.603-101.789 34.603s-73.564-12.915-101.789-34.603v119.714h203.578V392.31zM392.154 372.405h-4.353v139.619h124.223v-19.749c0-66.096-53.773-119.87-119.87-119.87zM124.223 372.405h-4.353C53.774 372.405 0 426.179 0 492.275v19.749h124.223V372.405zM316.03 31.827v108.567h76.545c-2.629-24.412-11.658-47.44-26.545-67.304-13.119-17.505-30.45-31.708-50-41.263zM145.994 73.092c-14.887 19.865-23.916 42.891-26.544 67.303h76.546V31.827c-19.552 9.555-36.883 23.759-50.002 41.265z"
          fill="#0052C4"
        />
        <path
          d="M256.012 396.913c75.756 0 137.388-61.632 137.388-137.388V237.92H118.625v21.605c0 75.756 61.632 137.388 137.387 137.388zM225.995 0h60.035v140.395h-60.035zM84.862 170.395h342.301v37.526H84.862z"
          fill="#0052C4"
        />
      </g>
    </svg>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold">{worker.name}</h1>
        <p className="text-xl text-gray-500">{worker.profession}</p>
        <div className="flex justify-center mt-4">
          <span className="mr-4 text-gray-700">Rating: {worker.rating}</span>
          <span className="mr-4 text-gray-700">Age: {worker.age}</span>
          <span className="text-gray-700">Total Requests: {worker.totalRequests}</span>
        </div>
      </div>

      {/* تفاصيل الطلبات */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`card p-6 border rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl ${
              approvalStatus[order.id] === 'approved' ? 'bg-green-100' : ''
            } ${approvalStatus[order.id] === 'rejected' ? 'bg-red-100' : ''}`}
          >
            <h3 className="text-2xl font-semibold">{order.request}</h3>
            <p className="text-gray-600 mt-2">Location: {order.location}</p>
            <p className="text-gray-600 mt-2">User: {order.user}</p>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleApproval(order.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Approve
              </button>
              <button
                onClick={() => handleRejection(order.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Reject
              </button>
            </div>

            {approvalStatus[order.id] && (
              <div className="mt-2 text-sm text-gray-500">
                Status: {approvalStatus[order.id] === 'approved' ? 'Approved' : 'Rejected'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerProfile;
