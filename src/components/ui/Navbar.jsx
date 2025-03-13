import { Link, NavLink } from "react-router-dom";
import {
  PiShoppingCartLight,
  PiStorefrontLight,
  PiUserCircleLight,
  PiInfoLight,
} from "react-icons/pi";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent absolute w-full top-0 left-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-white text-3xl font-bold">My Store</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12 text-lg">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiInfoLight />
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiShoppingCartLight />
              <span>Wishlist</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiStorefrontLight />
              <span>Shop</span>
            </NavLink>
          </li>
          <li>
            {user ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400"
                    : "text-white flex items-center space-x-2"
                }
              >
                <PiUserCircleLight />
                <span>Sign-out</span>
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400"
                    : "text-white flex items-center space-x-2"
                }
              >
                <PiUserCircleLight />
                <span>Register</span>
              </NavLink>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden text-lg`}>
        <ul className="flex flex-col space-y-4 items-center">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiInfoLight />
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiShoppingCartLight />
              <span>Wishlist</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiStorefrontLight />
              <span>Shop</span>
            </NavLink>
          </li>
          <li>
            {user ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400"
                    : "text-white flex items-center space-x-2"
                }
              >
                <PiUserCircleLight />
                <span>Sign-out</span>
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400"
                    : "text-white flex items-center space-x-2"
                }
              >
                w
                <PiUserCircleLight />
                <span>Register</span>
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
