import { useNavigate } from "react-router-dom";
import { components } from "../constant";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <div>
      <ol style={{ cursor: "pointer" }}>
        {components?.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleClick(item.route);
            }}
          >
            {" "}
            {item.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
