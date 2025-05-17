import { useNavigate } from "react-router-dom";
import { components } from "../constant";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div>
      <ol
        style={{ cursor: "pointer" }}
        type="1"
        className="text-white list-decimal mx-4"
      >
        {components?.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleClick(item.route);
            }}
            className="text-white "
          >
            {item.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
