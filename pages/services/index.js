import { useEffect, useState } from "react";

const Home = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch services from the API
    fetch("https://fixly-umber.vercel.app/fixly/api/service/getall", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        return response.json();
      })
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setServices(data.data); // Use the API response to populate services
        } else {
          setServices([]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const HeroSlider = () => {
    const slides = services.map((service, index) => ({
      image: service.image[0], // Assuming `image` is an array
      title: service.title,
      description: service.desc,
    }));

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () =>
      setCurrentSlide((currentSlide + 1) % slides.length);

    const prevSlide = () =>
      setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

    if (isLoading || slides.length === 0) {
      return <div>Loading Slider...</div>;
    }

    return (
      <div className="relative w-full h-[600px] bg-gray-100">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="container mx-auto h-full flex flex-col justify-center items-center text-white space-y-6 text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold">{slide.title}</h1>
              <p className="text-lg md:text-xl">{slide.description}</p>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
          onClick={prevSlide}
        >
          &#8592;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
          onClick={nextSlide}
        >
          &#8594;
        </button>
      </div>
    );
  };

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
            className="bg-white shadow-lg rounded-lg overflow-hidden"
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
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
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
