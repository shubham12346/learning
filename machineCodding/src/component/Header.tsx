import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textDecoration: "underline",
        textDecorationColor: "white",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate("/");
      }}
    >
      <h2 className="read-the-docs text-4xl pb-5 text-white">
        Frontend Machine Questions
      </h2>
    </div>
  );
};

export default Header;
