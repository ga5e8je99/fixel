import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaShoppingCart } from "react-icons/fa";
import API_BASE_URL from "@/lib/config";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Getting the dynamic ID from the URL

  useEffect(() => {
    if (id) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`${API_BASE_URL}/api/parts/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setProduct(result.data); // Assuming the response has a 'data' field containing the product
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setError("Failed to fetch product details");
          setLoading(false);
        });
    }
  }, [id]);

  const handleOrderNow = async () => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    if (!token) {
      setError("User not logged in");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      part_id: product.id,
      total_price: product.price, // Assuming total_price is based on the product price
      price: product.price,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        API_BASE_URL + "/api/orders",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to place order");
      }
      const result = await response.json();
      console.log("Order placed successfully:", result);
      alert("Order placed successfully");
      // Optionally, redirect to a different page or show a success message
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">
          {product.name}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-64 h-64 object-cover rounded-md mb-4"
          />
          <p className="text-lg font-medium text-gray-600 mb-4">
            {product.description}
          </p>
          <p className="text-blue-600 font-bold text-xl mb-4">
            ${product.price}
          </p>
          <button
            onClick={handleOrderNow}
            className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <FaShoppingCart className="mr-2" />
            Order Now
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
