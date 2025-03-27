import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/StoreApi";
import { data, Link } from "react-router-dom";
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

  const categoryImages = {
    beauty:
      "https://images.unsplash.com/photo-1643185450492-6ba77dea00f6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fragrances:
      "https://media.istockphoto.com/id/687498918/photo/perfume.webp?a=1&s=612x612&w=0&k=20&c=0WyIw5Wql4xiw0Pcl7hiztWXtoKjG2Xomynsz5Qgo4E=",
    furniture:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "home-decoration":
      "https://plus.unsplash.com/premium_photo-1682394265183-68113f05a103?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "kitchen-accessories":
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1868&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "mens-shirts":
      "https://images.unsplash.com/photo-1602810320073-1230c46d89d4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "mens-shoes":
      "https://images.unsplash.com/photo-1556004583-d2aaffbba592?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "mens-watches":
      "https://images.unsplash.com/photo-1600071177478-88758260617d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "mobile-accessories":
      "https://images.unsplash.com/photo-1599950755346-a3e58f84ca63?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    motorcycle:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "skin-care":
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    smartphones:
      "https://images.unsplash.com/photo-1640936343842-268f9d87e764?q=80&w=1694&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    sunglasses:
      "https://media.istockphoto.com/id/1134837210/photo/sunglasses.webp?a=1&b=1&s=612x612&w=0&k=20&c=RyXp28rOiSwb1AU3XBgemAZbppjzQis_lG7WZM9291w=",
    tablets:
      "https://plus.unsplash.com/premium_photo-1670981099509-57ddbe26d9cc?q=80&w=1620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tops: "https://images.unsplash.com/photo-1634269613041-ca2762adfa39?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vehicle:
      "https://images.unsplash.com/photo-1606222170385-4aa77d702744?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "womens-bags":
      "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "womens-dresses":
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "womens-jewellery":
      "https://plus.unsplash.com/premium_photo-1669977749936-1343d0b0b4d9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "womens-shoes":
      "https://plus.unsplash.com/premium_photo-1673818515821-a795608f7cb0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "womens-watches":
      "https://images.unsplash.com/photo-1615860756652-d1efbcb5d784?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    groceries:
      "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    laptops:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "sports-accessories":
      "https://plus.unsplash.com/premium_photo-1668767725891-58f5cd788105?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

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
              className="group bg-white p-4 rounded-sm shadow-md flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={categoryImages[category.slug] || "100"}
                alt={category.name}
                className="w-24 h-24 object-cover rounded-full group-hover:scale-106 transition-transform duration-300  "
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
