import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const renderServices = () => {
    if (isLoading) {
      return <div>Loading services...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (services.length === 0) {
      return <div>No services available.</div>;
    }

    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`/cart/${service._id}`)} // Navigate to Cart with the service ID
          >
            <img
              src={service.image[0]}
              alt={service.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
              <p className="text-green-500 font-semibold mt-2">
                Price: {service.price}
              </p>
              <p className="text-yellow-500 font-semibold mt-1">
                Points: {service.point}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      <HeroSlider />
      <div className="py-12">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Our Services
        </h2>
        {renderServices()}
      </div>
    </div>
  );
};

export default Home;
