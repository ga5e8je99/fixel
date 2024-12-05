import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import API_BASE_URL from "@/lib/config";
//

//
const Market = () => {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch()
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Assuming 'data.data' contains the list of products
  //       setProducts(data.data);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, []);

  return (
    <>
      <div className="bg-gray-50 flex flex-col">
        {/* Hero Section */}
        <div className="relative bg-[url('https://img.freepik.com/free-photo/top-view-steel-hammer-with-other-construction-elements-tools_23-2150576383.jpg?t=st=1733424446~exp=1733428046~hmac=49146cf41dd440fc17b9d68020ca73beac168412556cc26645641dbe08da625b&w=996')] bg-cover bg-center h-[400px]">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div
              className="max-w-lg text-white space-y-6 flex flex-col md:items-start md:text-start items-center text-center"
              style={{
                position: "relative",
                textAlign: "center",
              }}
            >
              <h1
                className="md:text-5xl text-4xl font-bold mb-0"
                style={{
                  textAlign: "center",
                  marginLeft: "93px",
                }}
              >
                Our Market
              </h1>
              <p>
                "Discover a variety of products tailored to meet your every need."
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
           
              <a
                href={"/market/" + 0}
                key={0}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJb8Nku3zGH5OhSYUu9mEGff4HVdaGGQ7_Pg&s'}
                  alt={"product.name"}
                  className="h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {"product.name"}
                </h3>
                <p className="text-gray-500 mb-2 text-center px-3">
                  {"product.description"}
                </p>
                <p className="text-[#1b224f] font-bold text-lg">
                  {"500"} $
                </p>
                <button
                  className="mt-4 flex items-center bg-[#1b224f] text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#1b224f] transition"
                  style={{
                    transition: "all 0.3s ease",
                    transform: "translateY(0)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <FaShoppingCart className="mr-2" />
                  View Product
                </button>
              </a>
            
              <a
                href={"/market/" + 0}
                key={0}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={'https://www.jharlen.com/images/product/large/11588.jpg'}
                  alt={"product.name"}
                  className="h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {"product.name"}
                </h3>
                <p className="text-gray-500 mb-2 text-center px-3">
                  {"product.description"}
                </p>
                <p className="text-[#1b224f] font-bold text-lg">
                  {"500"} $
                </p>
                <button
                  className="mt-4 flex items-center bg-[#1b224f] text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#1b224f] transition"
                  style={{
                    transition: "all 0.3s ease",
                    transform: "translateY(0)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <FaShoppingCart className="mr-2" />
                  View Product
                </button>
              </a>
              <a
                href={"/market/" + 0}
                key={0}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={'https://www.zestdent.com/media/catalog/product/0/9/09599-m_locator_fixed_seating_and_removal_tool.png?quality=100&bg-color=255,255,255&fit=bounds&height=1000&width=1250&canvas=1250:1000&format=jpeg'}
                  alt={"product.name"}
                  className="h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {"product.name"}
                </h3>
                <p className="text-gray-500 mb-2 text-center px-3">
                  {"product.description"}
                </p>
                <p className="text-[#1b224f] font-bold text-lg">
                  {"500"} $
                </p>
                <button
                  className="mt-4 flex items-center bg-[#1b224f] text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#1b224f] transition"
                  style={{
                    transition: "all 0.3s ease",
                    transform: "translateY(0)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <FaShoppingCart className="mr-2" />
                  View Product
                </button>
              </a>
              
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;
