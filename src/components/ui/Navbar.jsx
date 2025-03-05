import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent absolute w-full top-0 left-0 z-10">
      <div className="container mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center ">
          <h1 className="text-white text-2xl font-bold">My Store</h1>
        </div>
        <div className="flex justify-between mt-4">
          {/* Left section */}
          <ul className="flex space-x-8">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "text-blue-400" : "text-gray-400")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlist"
                className={({ isActive }) => (isActive ? "text-blue-400" : "text-gray-400")}
              >
                Wishlist
              </NavLink>
            </li>
          </ul>
          {/* Right section */}
          <ul className="flex space-x-8">
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) => (isActive ? "text-blue-400" : "text-gray-400")}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "text-blue-400" : "text-gray-400")}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
