import { useRef, useState } from "react";

const OtpComponent = () => {
  return (
    <div>
      OtpComponent
      <div>
        <Otp field={6} />
      </div>
    </div>
  );
};

const Otp = ({ field = 4 }) => {
  const [fields, setField] = useState(Array.from({ length: field }).fill(""));
  const inputRef = useRef<any>([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only numbers allowed

    const updatedFields = [...fields];
    updatedFields[index] = value;
    setField(updatedFields);

    if (value && index < field - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    console.log("e", e.key, index);
    if (e.key === "Backspace") {
      const newOpt = [...fields];
      newOpt[index] = "";
      setField(newOpt);

      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };
  return (
    <div>
      OtpComponent
      {fields.map((inpt, index) => (
        <input
          type="text"
          style={{
            height: "50px",
            width: "50px",
            backgroundColor: "white",
            margin: "20px",
            paddingTop: "10px",
            paddingLeft: "20px",
            color: "black",
          }}
          maxLength={1}
          key={index}
          value={inpt as string}
          onChange={(e) => handleChange(index, e)}
          ref={(el: any) => (inputRef.current[index] = el)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default OtpComponent;
