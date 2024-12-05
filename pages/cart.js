const Cart = () => {
  return (
    <>
      <div className="bg-gray-50 flex flex-col">
        {/* Hero Section */}
        <div className="relative bg-[url('/worker-bg.jpg')] bg-cover bg-center h-[200px]">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            {/* Left Content */}
            <div className="max-w-lg text-white space-y-6 flex flex-col md:items-start md:text-start items-center text-center">
              <h1 className="md:text-5xl text-4xl font-bold mb-0">Cart</h1>
            </div>

            {/* Right Worker Image */}
            <div className="hidden lg:block flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
