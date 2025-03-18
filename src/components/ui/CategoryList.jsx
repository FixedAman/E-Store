import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/StoreApi";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (isLoading)
    return (
      <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
        Processing…
      </svg>
    );
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load categories</p>
    );


  return (
    <>
      <div className="container  mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories?.map((category, index) => (
            <Link
              to={`/category/${category.slug}`}
              key={index}
              className="group bg-white p-4 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={`https://via.placeholder.com/100?text=${category.name}`}
                alt={category.name}
                className="w-24 h-24 object-cover rounded-full group-hover:scale-105 transition-transform"
              />
              <p className="mt-3 text-lg font-medium text-gray-700 capitalize">
                {category.name}
              </p>
            </Link>
          ))}
        </div>  
      </div>
    </>
  );
};
export default CategoryList;
