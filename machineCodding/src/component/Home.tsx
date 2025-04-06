import { useNavigate } from "react-router-dom";
import { components } from "../constant";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
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
