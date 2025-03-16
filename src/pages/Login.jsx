import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  setUser,
  signWithGoogle,
} from "../store/features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const { error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get item from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      dispatch(setUser(storedData));
    }
  }, [dispatch]);
  const handleClick = async () => {
    const result = await dispatch(signWithGoogle());
    if (signWithGoogle.fulfilled.match(result)) {
      navigate("/");
    }
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      // window.location.reload();
      navigate("/");
    } else {
      console.log(result.error.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "Login"
              )}
            </button>
            <button
              onClick={handleClick}
              className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 shadow-md"
              disabled={loading}
            >
              <img
                src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
                alt="Google Logo"
                className="w-5 h-5 mr-3"
              />
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?
            <NavLink to="/register" className="text-blue-700 ml-1">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
