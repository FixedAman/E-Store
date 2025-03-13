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
    <div className="relative w-full h-140">
      <img
        src="/images/Flex.jpg"
        alt="Store Background"
        className="w-full h-full object-cover"
      />
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl text-white mt-2 underline underline-offset-8 text-center">
        Product For The Soul
      </h1>
      <div className="button-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl rounded-xl mt-24">
        <button className="text-white border-2 border-white px-4 md:px-6 py-2 rounded-xl bg-transparent hover:bg-white hover:text-black transition-colors duration-300">
          Shop Now
        </button>
      </div>

      {/* Search Bar */}
      <div className="absolute inset-0 flex flex-col items-center justify-end mb-12">
        <form
          className="bg-white bg-opacity-80 rounded-sm shadow-lg w-3/4 md:w-1/2 flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200 w-full"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
          />
          <CiSearch className="m-2 mt-3 cursor-pointer text-xl md:text-2xl" />
        </form>
           
        {/* Search Results */}
        <div className="w-3/4 md:w-1/2 mt-2">
         
          {isError && (
            <p className="text-red-500 text-center">Something went wrong!</p>
          )}
          {data && <SearchResult result={data} />}
        </div>
      </div>
    </div>
  );
};

export default FlexContainer;
