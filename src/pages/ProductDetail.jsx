import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getData, singleProductDetails } from "../components/api/StoreApi";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import { Repeat, ShoppingCart, ShoppingBag } from "lucide-react";
import CategoryCard from "../components/ui/CategoryCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(null);

  // Fetch individual product details
  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => singleProductDetails(id),
  });

  // Fetch related products for the sidebar
  const category = product?.category;
  const { data: sidebar = [], isLoading: loading } = useQuery({
    queryKey: ["category", category],
    queryFn: () => getData(category),
    enabled: !!product?.category,
  });

  if (isError) {
    return (
      <p className="text-center text-red-500 font-semibold mt-10">
        Something went wrong.
      </p>
    );
  }

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  }

  // Set default image when data loads
  if (!mainImage && product) {
    setMainImage(product.thumbnail);
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg mt-8 ">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-96 object-contain rounded-lg border border-gray-300 shadow-md"
          />
          <div className="flex mt-4 gap-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${
                  mainImage === img ? "border-blue-500" : "border-gray-300"
                } hover:scale-105`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>

          <div className="flex flex-wrap gap-4 mt-2">
            <p className="text-gray-700">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center mt-2">
            <span className="text-lg font-semibold">{product.rating}</span>
            <AiFillStar className="text-yellow-500 ml-1" />
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews?.length} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <p className="text-2xl font-bold text-green-600">
              ${product.price}
            </p>
            <p className="text-sm text-red-500">
              {product.discountPercentage}% OFF
            </p>
          </div>

          {/* Stock */}
          <p className="text-lg mt-2">
            <span className="font-semibold">Stock:</span> {product.stock} left
          </p>
          <p
            className={`mt-1 font-semibold ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Shipping */}
          <p className="mt-2 text-gray-700 flex items-center gap-2">
            <Repeat /> {product.returnPolicy}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-yellow-500 flex items-center gap-2 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              className="bg-blue-600 flex items-center gap-2 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={product.stock === 0}
            >
              <ShoppingBag size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <div
              key={index}
              className="border-t border-gray-300 pt-4 mt-4 rounded-lg bg-gray-100 p-4"
            >
              <div className="flex justify-between items-center">
                <div className="user_container">
                  <img
                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                    alt=""
                    className="w-12 h-12 rounded-full  hidden sm:block"
                  />
                  <p className="text-lg font-semibold">{review.reviewerName}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              <div className="flex items-center text-yellow-500 mt-2">
                {[...Array(Math.round(review.rating))].map((_, i) => (
                  <AiFillStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 mt-1">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Sidebar (Below Reviews) */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {sidebar.length > 0 ? (
            sidebar.map((data) => <CategoryCard key={data.id} data={data} />)
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
