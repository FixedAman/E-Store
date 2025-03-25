import { useSelector, useDispatch } from "react-redux";
import CategoryCard from "../components/ui/CategoryCard";
import { useEffect } from "react";
import { loadWishlistFromFireBase } from "../store/features/wishlist/wishListSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      dispatch(loadWishlistFromFireBase(user.uid));
    }
  }, [user, dispatch]);
  if (!user) {
    return <p>Log in then see ur wishlist </p>;
  }
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
            <Link to={`/product/${item.id}`} key={item.id}>
              <CategoryCard key={item.id} data={item} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
export default Wishlist;
