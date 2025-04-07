import { useState } from "react";
import { loadRazorpayScript } from "../components/utils/razorpayLoader";
import { Contact, Key } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../store/features/order/orderSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalprice = cartItems.reduce(
    (prev, amount) => prev + Number(amount.price),
    0
  );
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    firstAddress: "",
    secondAddress: "",
    pinCode: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlepayment = async () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.firstAddress ||
      !formData.pinCode
    ) {
      alert("please  fill up ");
      return;
    }
    const res = await loadRazorpayScript();
    if (!res) {
      alert("razor pay failed to load");
      return;
    }
    const options = {
      key: "rzp_test_Xtxv1u9Xp0Fp3C",
      amount: totalprice,
      currency: "usd",
      name: "e-store",
      description: "Order payment",
      handler: async function (response) {
        const orderData = {
          email: user.email,
          buyer: formData,
          cart: cartItems,
          amount: totalprice,
          paymentId: response.razorpay_payment_id,
        };
        dispatch(createOrder({ userId: user.uid, orderData }));
        alert("Payment Successful!");
        navigate("/");
      },
      prefil: {
        name: formData.fullName,
        email: user.email,
        contact: formData.phone,
      },
      theme: { color: "#6366f1" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="max-w-2xl mx-auto  p-4 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 ">Check-out</h2>
      <input
        type="text"
        name="fullName"
        placeholder="enter your name "
        value={formData.fullName}
        className="w-full border px-4 py-2 mb-2 rounded"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="phone"
        placeholder="Number"
        value={formData.phone}
        className="w-full border px-4 py-2 mb-2 rounded "
        required
        onChange={handleChange}
      />
      <div className="container flex">
        <input
          type="text"
          placeholder="city"
          value={formData.city}
          className="w-1/3 px-4 py-4 mb-2 rounded border mr-1"
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstAddress"
          placeholder="first Address"
          value={formData.firstAddress}
          className="w-full border px-4 py-2 mb-2 rounded"
          required
          onChange={handleChange}
        />
      </div>

      <input
        type="text"
        name="secondAddress"
        placeholder="second Address"
        value={formData.secondAddress}
        className="w-full border px-4 py-2 mb-2 rounded"
        onChange={handleChange}
      />
      <input
        type="number"
        name="pincode"
        value={formData.pinCode}
        placeholder="pincode"
        className="w-full border px-4 py-2 mb-2 rounded"
        required
        onChange={handleChange}
      />
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handlepayment}
      >
        Pay ${totalprice.toFixed(2)}
      </button>
    </div>
  );
};

export default Checkout;
