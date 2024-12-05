import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isJoinDropdownOpen, setIsJoinDropdownOpen] = useState(false);

  const router = useRouter();

  // Function to toggle menus
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleJoinDropdown = () => setIsJoinDropdownOpen(!isJoinDropdownOpen);

  const isActive = (path) => router.pathname === path;

  const [user, setUser] = useState(null);

  const updateUserFromLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (userData && token) {
      setUser(userData);
    }
  };

  useEffect(() => {
    updateUserFromLocalStorage();

    // Add event listener for storage change
    const handleStorageChange = () => {
      updateUserFromLocalStorage();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleRedirect = () => {
    if (!user || !user.user_id) return; // Ensure user data is available
    const route = user.craftsmanId
      ? `/profile/worker/${user.user_id}`
      : `/profile/user/${user.user_id}`;
    router.push(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-400 text-[28px]">
            <img src="/fixly-logo.png" className="h-[50px]" alt="Fixly Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 z-50">
          <ul className="flex space-x-12 font-semibold">
            <li>
              <Link
                href="/"
                className={`hover:text-gray-400 ${
                  isActive("/") ? "text-[#1b224f]" : "text-gray-700"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className={`hover:text-gray-400 ${
                  isActive("/services") ? "text-[#1b224f]" : "text-gray-700"
                }`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/market"
                className={`hover:text-gray-400 ${
                  isActive("/market") ? "text-[#1b224f]" : "text-gray-700"
                }`}
              >
                Market
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`hover:text-gray-400 ${
                  isActive("/contact") ? "text-[#1b224f]" : "text-gray-700"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:block relative">
          {user ? (
            // Dropdown for logged-in user
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-[#1b224f] text-white px-3 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
              >
                <FaUserAlt color="white" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      toggleDropdown();
                      router.push(
                        user.craftsmanId
                          ? `/profile/worker/${user.user_id}`
                          : `/profile/user/${user.user_id}`
                      );
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Welcome {`${user.first_name} ${user.last_name}`}
                  </button>
                  <button
                    onClick={() => {
                      toggleDropdown();
                      handleRedirect();
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      toggleDropdown();
                      router.push("/cart");
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Cart
                  </button>

                  <a
                    onClick={() => {
                      handleLogout();
                      toggleDropdown();
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            // Dropdown for "Join Now" button
            <div className="relative">
              <button
                onClick={toggleJoinDropdown}
                className="bg-[#1b224f] text-white px-3 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
              >
                <FaUserAlt color="white" />
              </button>

              {isJoinDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                  <Link
                    href="/login"
                    onClick={toggleJoinDropdown}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/join"
                    onClick={toggleJoinDropdown}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center z-50">
          <button
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Open Menu"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-[80%] h-[100vh] bg-white shadow-md absolute top-0 left-0 py-4 px-4 space-y-4 z-50">
          <div className="flex justify-between">
            <img src="/fixly-logo.png" />

            <button
              onClick={toggleMenu}
              className="text-black px-1 py-1 rounded-full hover:bg-blue-700 transition"
            >
              X
            </button>
          </div>

          <ul className="space-y-6 pt-10 font-semibold z-50">
            <li>
              <Link
                href="/"
                onClick={toggleMenu}
                className={`block hover:text-gray-400 ${
                  isActive("/") ? "text-[#1b224f]" : "text-gray-700"
                }`}
              >
                Homepage
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className={`block hover:text-gray-400 ${
                  isActive("/services") ? "text-[#1b224f]" : "text-gray-700"
                }`}
                onClick={toggleMenu}
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                href="/market"
                onClick={toggleMenu}
                className={`block hover:text-gray-400 ${
                  isActive("/market") ? "text-[#1b224f]" : "text-gray-700"
                }`}
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={toggleMenu}
                className={`block hover:text-gray-400 ${
                  isActive("/contact") ? "text-[#1b224f]" : "text-gray-700"
                }`}
              >
                Contact Us
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      router.push(
                        user.craftsmanId
                          ? `/profile/worker/${user.user_id}`
                          : `/profile/user/${user.user_id}`
                      );
                      toggleMenu();
                    }}
                    className={`block hover:text-gray-400 ${
                      isActive("/profile") ? "text-[#1b224f]" : "text-gray-700"
                    }`}
                  >
                    Welcome {`${user.first_name} ${user.last_name}`}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      router.push(
                        user.craftsmanId
                          ? `/profile/worker/${user.user_id}`
                          : `/profile/user/${user.user_id}`
                      );
                      toggleMenu();
                    }}
                    className={`block hover:text-gray-400 ${
                      isActive("/profile") ? "text-[#1b224f]" : "text-gray-700"
                    }`}
                  >
                    My Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className={`block hover:text-gray-400 ${
                      isActive("") ? "text-[#1b224f]" : "text-gray-700"
                    }`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className={`block hover:text-gray-400 ${
                      isActive("/contact") ? "text-[#1b224f]" : "text-gray-700"
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleMenu}
                    href="/join"
                    className={`block hover:text-gray-400 ${
                      isActive("/contact") ? "text-[#1b224f]" : "text-gray-700"
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
