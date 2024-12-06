import API_BASE_URL from "@/lib/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();




  const HeroSlider = () => {
    const slides = [
      {
        image:
          "https://img.freepik.com/free-photo/top-view-different-types-tools_23-2148428246.jpg?semt=ais_hybrid",
        title: "Reliable Tools, Anytime",
        description: "Explore our range of top-quality tools for every fix.",
      },
      {
        image:
          "https://img.freepik.com/free-photo/tools-arranged-top-view_23-2148428674.jpg",
        title: "Professional Assistance",
        description: "Get help from our skilled craftsmen today.",
      },
      {
        image:
          "https://img.freepik.com/free-photo/construction-tools-wooden-background_23-2147877557.jpg",
        title: "Efficient Repairs Made Easy",
        description: "Trust Fixly for all your repair needs.",
      },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () =>
      setCurrentSlide((currentSlide + 1) % slides.length);

    const prevSlide = () =>
      setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

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
              <h1 className="text-4xl md:text-5xl font-bold" style={{ zIndex: "2" }}>
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl" style={{ zIndex: "2" }}>
                {slide.description}
              </p>
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

  return (
    <div className="bg-gray-50 flex flex-col">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Onboarding Section */}
      <div className="min-h-screen bg-gray-100 py-16 px-4">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gridGap: "70px",
            padding: "100px",
            height: "400px",
            margin: "20px 30px 200px 30px",
          }}
        >
          <div
            style={{
              contain: "",
              backgroundImage:
                'url("https://img.freepik.com/free-photo/mechanic-man-uniform-holding-wrenches-auto-service-center-smiling-camera_496169-1000.jpg?t=st=1733391420~exp=1733395020~hmac=c9c477c483f09b07a9e273fca827447183064609279c82fc98f659f7b0962180&w=996")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "400px",
            }}
          ></div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#1b224f" }}>About Fixly</h3>
            <p>
              Fixly is your trusted partner for all your tool repair and
              maintenance needs. Designed with convenience in mind, Fixly connects
              you to professional craftsmen who provide top-notch services to
              ensure your tools are always in perfect condition. Whether you need
              quick repairs, expert advice, or comprehensive solutions, Fixly has
              you covered. With our user-friendly platform, seamless booking
              process, and 24/7 customer support, we make it easy for you to fix,
              maintain, and optimize your tools, saving you time and money. Choose
              Fixly for quality, reliability, and unmatched service excellence!
            </p>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://img.freepik.com/free-icon/idea_318-856758.jpg"
                alt="Step 1"
                className="w-20 h-20 mb-4"
              />
              <h2 className="text-xl font-bold text-[#1b224f] mb-2">
                Discover Our Services
              </h2>
              <p className="text-gray-600 text-center">
                Explore a variety of tools and repair services tailored to your
                needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://img.freepik.com/free-icon/repair_318-856756.jpg"
                alt="Step 2"
                className="w-20 h-20 mb-4"
              />
              <h2 className="text-xl font-bold text-[#1b224f] mb-2">
                Make a Reservation
              </h2>
              <p className="text-gray-600 text-center">
                Book our skilled craftsmen for efficient repairs and support.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://img.freepik.com/free-icon/tools_318-856757.jpg"
                alt="Step 3"
                className="w-20 h-20 mb-4"
              />
              <h2 className="text-xl font-bold text-[#1b224f] mb-2">
                Get Things Fixed
              </h2>
              <p className="text-gray-600 text-center">
                Enjoy hassle-free and reliable repair services from our team.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <a
              href="/services"
              className="px-8 py-4 bg-[#1b224f] text-white rounded-md shadow-lg hover:bg-[#253075] transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-[#1b224f] mb-6">We Value Your Feedback</h2>
          <p className="text-gray-600 mb-8">
            Your feedback helps us improve our services. Please share your experience with Fixly.
          </p>
          <form className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-left text-gray-700 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b224f]"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-left text-gray-700 font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b224f]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-left text-gray-700 font-medium">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows="5"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1b224f]"
                placeholder="Share your thoughts with us"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1b224f] text-white rounded-md shadow-lg hover:bg-[#253075] transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
