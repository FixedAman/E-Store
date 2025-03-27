import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Cart Items</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-md flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover mb-3"
              />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <h2 className="text-gray-600">${item.price}</h2>
              <h2 className="text-sm text-gray-500">Quantity: {item.quantity}</h2>
            </div>
          ))}
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
