import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { getSearchData } from "../api/StoreApi";
import SearchResult from "./SearchResults";

const FlexContainer = () => {
  const [search, setSearch] = useState("");

  const { data, isError, isPending } = useQuery({
    queryKey: ["search", search],
    queryFn: () => getSearchData(search),
    enabled: !!search,
  });

  const handleChange = (value) => {
    setSearch(value.toLowerCase());
  };
  return (
    <div className="relative w-full h-140 flex flex-col md:flex-row items-center">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 underline text-wrap">
          Hurry Start Shopping Now!
        </h1>
        <p className="text-gray-600 text-lg mt-2 underline">
          Find the best deals and exclusive products.
        </p>
        <p className="text-gray-600 text-lg mt-2 underline">
        guilt free shoping
        </p>

        <div className="mt-6">
          <button className="text-white border-2 border-black px-6 py-2 rounded-lg bg-black hover:bg-white hover:text-black transition-colors duration-300">
            Shop Now
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full mt-8">
          <form
            className="bg-white bg-opacity-80 rounded-md shadow-lg w-full flex items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={search}
              onChange={(e) => handleChange(e.target.value)}
            />
            <CiSearch className="m-3 cursor-pointer text-xl md:text-2xl" />
          </form>

          {/* Search Results */}
          <div className="w-full mt-2">
            {isError && (
              <p className="text-red-500 text-center">Something went wrong!</p>
            )}
            {data && <SearchResult result={data} />}
          </div>
        </div>
      </div>

      {/* Right Side: Text and Search */}
      <div className="w-full md:w-1/2 h-full">
        <img
          src="https://images.unsplash.com/photo-1538391543564-047a76156421?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Store Background"
          className="w-full h-full object-contain mt-2"
        />
      </div>
    </div>
  );
};

export default FlexContainer;
