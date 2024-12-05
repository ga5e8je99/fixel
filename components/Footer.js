import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 pt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-3">
        <h1>Fixly</h1>
        <span>This is the slogan</span>

        <div className="flex space-x-6 text-xl py-6">
          <Link
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <FaFacebook className="text-blue-600 transition-colors duration-200" />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <FaTwitter className="text-blue-400 transition-colors duration-200" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <FaInstagram className="text-pink-600 transition-colors duration-200" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-blue-700 transition-colors duration-200" />
          </Link>
        </div>

        <div className="w-full lg:w-[400px] flex justify-between items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <Link href="/market" className="hover:underline">
            Market
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
      <hr className="m-4 max-w-7xl mx-auto " />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Fixly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
