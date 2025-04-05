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
      <h2 className="read-the-docs">Frontend Machine Questions</h2>
    </div>
  );
};

export default Header;
