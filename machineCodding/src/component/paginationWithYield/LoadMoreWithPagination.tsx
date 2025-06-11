import { useRef, useState } from "react";
import { allItems, paginate, allMyItems, paginateStar } from "./Paginate";

const LoadMoreWithPagination = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [allVisibleItems, setAllVisibleItems] = useState([]);
  const generatorRef = useRef(paginate(allItems, 5)); // 5 items per page

  const genRef = useRef(paginateStar(allItems, 10));

  const handleLoadMore = () => {
    const next = generatorRef.current.next();
    if (!next.done) {
      setVisibleItems((prev) => [...prev, ...next.value]);
    }
  };
  console.log("hello");

  const handleAll = () => {
    const next = genRef.current.next();
    if (!next.done) {
      setAllVisibleItems((prev) => [...prev, ...next.value]);
    }
  };

  return (
    <div>
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2 text-white">Paginated List</h2>
        <ul className="list-disc pl-5 space-y-1">
          {visibleItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load More
        </button>
      </div>
      <div className="p-4 mx-auto">
        <h2 className="text-xl font-bold mb-2 text-white">Paginated List</h2>
        <ul className="list-disc pl-5 space-y-1 flex overflow-scroll">
          {allVisibleItems.map((item, idx) => (
            <li key={idx} className="px-2 my-2 mx-2">
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={handleAll}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default LoadMoreWithPagination;
