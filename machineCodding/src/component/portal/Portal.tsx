const Portal = ({ handleClose }) => {
  return (
    <div
      className="text-black "
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        width: "300px",
        height: "300px",
      }}
    >
      Portal
      <div>
        <button onClick={handleClose}>close </button>
      </div>
    </div>
  );
};

export default Portal;
