import { useState, useEffect, useRef } from "react";
import { useToaster } from "./toastSystemDesign/ToastContext";
import { createPortal } from "react-dom";
import Portal from "./portal/Portal";

const SearchAndDebounce = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [throttle, setThrottle] = useState(0);
  const debounced = useRef<any>(null);
  const countRef = useRef(0);
  const [modalOpen, setModalOpen] = useState(false);

  const { addToaster } = useToaster();

  useEffect(() => {
    if (debounced.current) {
      clearTimeout(debounced.current);
    }
    debounced.current = setTimeout(async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?q=${search}`
      );
      const data = await res.json();
      console.log(data);
    }, 500);
  }, [search]);

  // url = https://jsonplaceholder.typicode.com/users

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    // fetchUsers(e.target.value);
  };

  const handleThrottle = () => {
    setTimeout(() => {
      setThrottle((prev) => prev + 1);
    }, 1000);
  };

  const handleToaster = () => {
    addToaster("Added toaster succesfully", "success`");
  };

  return (
    <div className="text-white">
      SearchAndDebounce
      <input
        type="text"
        name=""
        id=""
        className="bg-white rounded-sm text-black "
        value={search}
        onChange={handleSearch}
      />
      <button onClick={handleThrottle}>throttle counting </button>
      <button className="flex w-40 p-2 rounded-2xl gap-2 cursor-pointer">
        {throttle}
      </button>
      <div>{countRef.current}</div>
      <button
        onClick={() => {
          countRef.current = countRef.current + 1;
          console.log(countRef.current);
        }}
      >
        click Ref
      </button>
      <button className="m-20 cursor-pointer border-2 " onClick={handleToaster}>
        Add Toaster
      </button>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="border-2 cursor-pointer"
      >
        Open Modal
      </button>
      {modalOpen &&
        createPortal(
          <Portal
            handleClose={() => {
              setModalOpen(false);
            }}
          />,
          document.body
        )}
    </div>
  );
};

export default SearchAndDebounce;
