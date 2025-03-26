import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  PiShoppingCartLight,
  PiStorefrontLight,
  PiUserCircleLight,
  PiInfoLight,
} from "react-icons/pi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      window.location.replace("/login");
    }
  };

  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  return (
    <nav className="bg-black w-full top-0 left-0 z-10 sticky">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <NavLink to="/">
          <h1 className="text-white text-3xl font-bold">My Store</h1>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12 text-lg">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 flex items-center space-x-2"
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
                  ? "text-blue-400 flex items-center space-x-2"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiShoppingCartLight />
              <span className="flex items-center gap-2 text-lg font-semibold">
                Wishlist
                <div className="bg-red-500 w-6 h-6 flex items-center justify-center rounded-xl text-white text-sm font-bold">
                  {wishlistCount}
                </div>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 flex items-center space-x-2"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiStorefrontLight />
              <span>Cart</span>
            </NavLink>
          </li>
          <li>
            {user ? (
              <button
                onClick={handleClick}
                className="text-white flex items-center space-x-2 hover:text-blue-400"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full border border-amber-600"
                  />
                ) : (
                  <PiUserCircleLight />
                )}
                <span>Logout</span>
              </button>
            ) : (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 flex items-center space-x-2"
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
                  ? "text-blue-400 flex items-center space-x-2"
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
                  ? "text-blue-400 flex items-center space-x-2"
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
                  ? "text-blue-400 flex items-center space-x-2"
                  : "text-white flex items-center space-x-2"
              }
            >
              <PiStorefrontLight />
              <span>Shop</span>
            </NavLink>
          </li>
          <li>
            {user ? (
              <button
                onClick={() => {
                  handleClick();
                  setIsOpen(false);
                }}
                className="text-white flex items-center space-x-2 hover:text-blue-400"
              >
                <PiUserCircleLight />
                <span>Sign-out</span>
              </button>
            ) : (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 flex items-center space-x-2"
                    : "text-white flex items-center space-x-2"
                }
              >
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
