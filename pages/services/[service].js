import React, { useState } from "react";

const ServicePage = ({ serviceData, error, reviewsData }) => {
  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", color: "#dc2626" }}>{error}</h1>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", color: "#4b5563" }}>
          Service data not available.
        </h1>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "4rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", background:'#000'}}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {serviceData.service_name}
        </h1>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1f2937",
            }}
          >
            {serviceData.service_name}
          </h2>
          <p style={{ color: "#6b7280", marginTop: "1rem" }}>
            {serviceData.service_description}
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#1f2937",
              marginTop: "1.5rem",
            }}
          >
            Price: ${serviceData.price}
          </p>

          <div style={{ marginTop: "3rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937",
              }}
            >
              Customer Reviews
            </h3>
            <div style={{ marginTop: "1rem" }}>
              {Array.isArray(reviewsData) && reviewsData.length === 0 ? (
                <p>No reviews yet. Be the first to review!</p>
              ) : (
                Array.isArray(reviewsData) &&
                reviewsData.map((review) => (
                  <div
                    key={review.id}
                    style={{
                      marginBottom: "1rem",
                      padding: "1rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 6px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "#1f2937",
                          marginRight: "0.5rem",
                        }}
                      >
                        User {review.user_id}
                      </span>
                      <span style={{ color: "#f59e0b" }}>
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
                      {review.review}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
