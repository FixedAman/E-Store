import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCartItem,
  decrementItemFromFirebase,
  incrementItemFromFirebase,
  loadCartFromFireBase,
} from "../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (prevItem, nextItem) => prevItem + Number(nextItem.price),
    0
  );
  useEffect(() => {
    if (user) {
      dispatch(loadCartFromFireBase(user.uid));
    }
  }, [user, dispatch]);

  if (!user) {
    return (
      <p className="text-center text-gray-500 mt-6">Login to see your cart.</p>
    );
  }

  const handleIncrease = (itemId) => {
    dispatch(incrementItemFromFirebase({ userId: user.uid, itemId }));
  };
  const handleDecrease = (itemId) => {
    dispatch(decrementItemFromFirebase({ userId: user.uid, itemId }));
  };
  const handleClear = () => {
    dispatch(clearCartItem(user.uid));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-start">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
          <div className="checkout-container flex justify-end">
            <p className="text-3xl">
              Total : <span>${totalPrice.toFixed(2)}</span>
            </p>
            <button
              className="bg-green-600 text-white px-6 py-2 ml-2 mb-2 rounded-md hover:bg-green-700 transition "
              onClick={() => navigate("/checkout")}
            >
              proceed
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
