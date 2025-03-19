import { useSelector } from "react-redux";
import CategoryCard from "../components/ui/CategoryCard";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  return (
    <>
      <h1>Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">
          Explore more to add in wishlist
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <CategoryCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </>
  );
};
export default Wishlist;
