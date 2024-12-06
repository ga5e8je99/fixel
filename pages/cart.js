import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Cart = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the product details from the API
    fetch(`https://fixly-umber.vercel.app/fixly/api/product/getone/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data.data); // Assuming the API response contains product details in `data`
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-[url('/worker-bg.jpg')] bg-cover bg-center h-[200px]">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg text-white space-y-6 flex flex-col md:items-start md:text-start items-center text-center">
            <h1 className="md:text-5xl text-4xl font-bold mb-0">{product.title}</h1>
          </div>
          <div className="hidden lg:block flex-1"></div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto my-12 px-4">
        <img
          src={product.image[0]}
          alt={product.title}
          className="w-full max-w-md mx-auto rounded-lg shadow-md"
        />
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 mt-2">{product.desc}</p>
          <p className="text-green-500 font-semibold mt-4">
            Price: {product.price}
          </p>
          <p className="text-yellow-500 font-semibold mt-2">
            Points: {product.point}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
