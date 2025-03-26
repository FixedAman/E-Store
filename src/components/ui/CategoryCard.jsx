import { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  saveWishlistFromFireBase,
} from "../../store/features/wishlist/wishListSlice";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const CategoryCard = ({ data }) => {
  const navigate = useNavigate();
   const wishlist = useSelector((state) => state.wishlist.items || []);
  const isWishlisted = wishlist.some((item) => item.id === data.id);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const userId = user.uid;
    const item = {
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.images?.[0],
    };

    const WishlistedAlready = wishlist.some(
      (wishlistitem) => wishlistitem.id === item.id
    );
    let updatedWishlist;
    if (WishlistedAlready) {
      updatedWishlist = wishlist.filter(
        (wishlisted) => wishlisted.id !== item.id
      );
    } else {
      updatedWishlist = [...wishlist, item];
    }
    dispatch(addToWishlist(item));
    dispatch(saveWishlistFromFireBase({ userId, wishlist: updatedWishlist }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl overflow-hidden p-5 flex flex-col items-center border border-gray-200 transition-transform transform    ">
      {/* Product Image */}
      <div className="relative w-full h-56 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <Link to={`/product/${data.id}`}>
          <img
            src={data.images?.[0] || data.image}
            alt={data.title}
            className="object-contain h-full w-full rounded-lg hover:scale-110 transition-transform duration-300"
          />
        </Link>
        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 text-xl text-red-500 hover:scale-125 transition-transform duration-200"
          onClick={handleClick}
        >
          {isWishlisted ? (
            <FaHeart className="animate-pulse" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{data.title}</h3>
        <p className="text-gray-500 text-sm mt-1 capitalize">{data.category}</p>
        <p className="text-2xl font-bold text-gray-800 mt-2"> ${data.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-4 w-full">
        <button className="w-1/2  flex items-center justify-center gap-2 bg-blue-800 rounded-sm text-white hover:bg-blue-600">
          <FaShoppingCart /> <span className="text-sm"> Cart</span>
        </button>
        <button className="w-24 bg-white text-black py-2 rounded-sm hover:bg-black hover:text-white outline  transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
