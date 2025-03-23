import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import About from "./pages/About.jsx";
import Shop from "./pages/Shop.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CategoryPage from "./components/ui/CategoryPage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        { path: "/category/:slug", element: <CategoryPage /> },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
