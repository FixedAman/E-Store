import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              We provide the best quality products with a seamless shopping
              experience. Stay connected and explore our latest collections.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/store" className="text-gray-400 hover:text-white transition">
                  Store
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-500 transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-500 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-blue-400 transition" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-700 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center text-gray-500 mt-8">
          <p>&copy; {new Date().getFullYear()} Your E-Commerce Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
