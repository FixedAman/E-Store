import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/StoreApi";
import { useState } from "react";

const SectionPanel = ({ category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    isPending,
    isError,
    data: products = [],
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getData(category),
  });

  if (isPending) {
    return <h1 className="text-center text-2xl font-bold">Loading...</h1>;
  }
  if (isError) {
    return (
      <h1 className="text-center text-2xl text-red-500">
        Error loading data 😢
      </h1>
    );
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 + products.length) % products.length);
  };

  return (
    <div className="component flex flex-col items-center mt-8">
      <div className="flex space-x-4 overflow-hidden">
        {visibleProducts.map((product) => (
          <div
            className="card bg-white shadow-lg rounded-lg p-4 w-60 text-center transform hover:scale-105 transition duration-300"
            key={product.id}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <p className="text-lg font-semibold mt-2">{product.title}</p>
            <h1 className="text-gray-500">{product.brand}</h1>
          </div>
        ))}
      </div>
      <div className="button-container mt-4 flex space-x-4">
        <button
          onClick={prevSlide}
          className={`px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition ${visibleProducts.length < 0 ? `bg-gray-200` : `` } `}
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SectionPanel;
