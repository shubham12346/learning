import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// PI to get all products : https://dummyjson.com/products

// Use the api above to fetch all the products in your react project, (you can use fetch or axios doesn't really matter),

// Display all the product titles on the web page

// API to search : ‘https://dummyjson.com/products/search?q={searchinput}'

// Use this API to build a search bar to filter the products based on the input (use onChange)

function App() {
  const [loadList, setLoadList] = useState([]);
  const [search, setSearch] = useState("");

  const timeRef = useRef(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (search = "") => {
    let url =
      search.length > 0
        ? `https://dummyjson.com/products/search?q=${search}`
        : "https://dummyjson.com/products";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("data", data);
    const products = mapResponseWithTitle(data);
    console.log("products", products);
    setLoadList(products);
  };

  console.log("loadList", loadList);

  const mapResponseWithTitle = (data) => {
    console.log("data inside map", data);
    const mappedWithTitle = data?.products?.map((item) => {
      return {
        id: item?.id,
        title: item?.title,
      };
    });
    return mappedWithTitle;
  };

  const handleSearch = async (e) => {
    let searchedValue = e.target.value;
    setSearch(e.target.value);
    try {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
      timeRef.current = setTimeout(async () => {
        await fetchData(searchedValue);
      }, 500);
    } catch (err) {
      console.log(err);
      setLoadList([]);
    }
  };

  const useDebouncer = (fn, delay) => {
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        fn();
      }, delay);
    };
  };

  return (
    <>
      <div className="mx-4 my-4">
        <div className="  w-1/5">
          <input
            type="text"
            className="border-2 border-gray-500 p-2"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <h2 className="h2">Product list </h2>
        <div>
          {loadList?.map((item) => (
            <div key={item?.id}>{item?.title} </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
