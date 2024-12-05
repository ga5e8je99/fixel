import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [user, setUser] = useState({
    id: "U12345",
    name: "John Doe",
    points: 50,
  });

  const levels = [
    {
      name: "Bronze",
      range: [0, 100],
      benefits: [
        { pointsRequired: 30, category: "Cashback", benefit: "5$ Cashback" },
        { pointsRequired: 40, category: "Discount", benefit: "20% Discount on Shoekies" },
      ],
    },
    {
      name: "Silver",
      range: [100, 300],
      benefits: [
        { pointsRequired: 150, category: "Cashback", benefit: "10$ Cashback" },
        { pointsRequired: 200, category: "Discount", benefit: "30% Discount on Accessories" },
      ],
    },
    {
      name: "Gold",
      range: [300, 500],
      benefits: [
        { pointsRequired: 350, category: "Cashback", benefit: "15$ Cashback" },
        { pointsRequired: 400, category: "Discount", benefit: "40% Discount on Premium Items" },
      ],
    },
    {
      name: "Platinum",
      range: [500, 700],
      benefits: [
        { pointsRequired: 550, category: "Cashback", benefit: "20$ Cashback" },
        { pointsRequired: 600, category: "Discount", benefit: "50% Discount on All Items" },
      ],
    },
  ];

  const getCurrentLevel = (points) => {
    return levels.find((level) => points >= level.range[0] && points < level.range[1]);
  };

  const currentLevel = getCurrentLevel(user.points);

  const redeemBenefit = (pointsRequired) => {
    if (user.points >= pointsRequired) {
      setUser((prev) => ({ ...prev, points: prev.points - pointsRequired }));
      alert("Benefit redeemed successfully!");
    } else {
      alert("Not enough points to redeem this benefit.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>User Rewards</h1>
      </header>

      <section className="profile-card">
      <div style={{width:'100%',display:'flex',justifyContent:'center',marginBottom:'30px'}}>
      <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  width="100"
  height="100"
  x="0"
  y="0"
  viewBox="0 0 512 512"
  style={{ enableBackground: "new 0 0 512 512" }}
>
  <defs>
    <linearGradient id="a" x1="50.49" x2="462.73" y1="256" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#0080de" />
      <stop offset="0.6" stopColor="#1c2244" />
      <stop offset="1" stopColor="#61caff" />
    </linearGradient>
  </defs>
  <g>
    <path
      fill="url(#a)"
      d="M263.57 511.9c-39.79 1-118-5.19-143.52-11.27-17.42-3.67-33.79-13.81-46.13-27.92S53.8 441.16 52 423.54l-.06-.54a285.44 285.44 0 0 1-1.23-39.62s-1-11.67 1.24-32.84c0-.18 0-.36.05-.53a76.2 76.2 0 0 1 22-45.92 77.61 77.61 0 0 1 46.27-22.28c25.63-2.71 103.63-4.19 143.27-4.19s103.27 1.47 128.9 4.19a77.59 77.59 0 0 1 46.27 22.29 76.26 76.26 0 0 1 22 45.93l.06.53c2.21 21.18 1.91 32.79 1.91 32.8a374.4 374.4 0 0 1-1.91 39.69c0 .18 0 .36-.05.54-1.81 17.63-9.6 35.05-21.94 49.18s-28.68 24.23-46.1 27.91c-25.57 5.79-89.32 11.49-129.11 11.22zM254 0a123.93 123.93 0 1 0 124 123.92A123.93 123.93 0 0 0 254 0z"
      opacity="1"
    />
  </g>
</svg>
      </div>

        <h2>{user.name}</h2>
        <p>ID: {user.id}</p>
        <p>Points: <strong>{user.points}</strong></p>
        <p>
          Level: <strong>{currentLevel ? currentLevel.name : "None"}</strong>
        </p>
      </section>

      {currentLevel && (
        <section className="benefits">
          <h3>Available Benefits ({currentLevel.name}):</h3>
          <ul>
            {currentLevel.benefits.map((benefit, index) => (
              <li key={index}>
                <span>
                  <strong>{benefit.category}:</strong> {benefit.benefit} 
                  (Requires {benefit.pointsRequired} points)
                </span>
                <button
                  className="redeem-button"
                  onClick={() => redeemBenefit(benefit.pointsRequired)}
                >
                  Redeem
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button
        className="button"
        onClick={() => setUser((prev) => ({ ...prev, points: prev.points + 50 }))}
      >
        Earn 50 Points
      </button>
    </div>
  );
};

export default App;
