import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getData } from "../api/StoreApi";
import CategoryCard from "./CategoryCard";

const CategoryPage = () => {
  const { slug } = useParams();
  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categoryName", slug],
    queryFn: () => getData(slug),
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
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {slug} Products
        </h2>
        <div className="card-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {product.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <CategoryCard key={item.id} data={item} />;
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default CategoryPage;
