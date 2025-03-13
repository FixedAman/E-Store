const SearchResult = ({ result }) => {
  if (!result || result.length === 0) {
    return <p className="text-white text-center mt-4">No products found.</p>;
  }

  return (
    <div className="absolute w-3/4 md:w-1/2 bg-white text-black rounded-lg shadow-lg mt-1 z-10">
      {result.map((product) => (
        <div
          key={product.id}
          className="p-4  last:border-b-0 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-4"
        >
          <div>
            <h3 className="text-lg font-semibold text-black">{product}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
