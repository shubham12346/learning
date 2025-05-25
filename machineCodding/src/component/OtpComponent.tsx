import { useEffect, useRef, useState } from "react";

const OtpComponent = () => {
  const onOtpSubmit = async (values) => {
    console.log("values", values);
  };

  return (
    <div className="text-white">
      OtpComponent
      <div className="text-center">
        <div>Enter Otp</div>
        <div className="my-4">
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      </div>
    </div>
  );
};

export default OtpComponent;

const OtpInput = ({ length = 4, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRef = useRef<any>([]);

  const handleOnChange = (e, index) => {
    let value = e.target.value;
    if (/[^0-9]/.test(value) && value !== "") {
      return;
    }

    const newOpt = [...otp];
    newOpt[index] = value;

    if (value && index < otp.length - 1) {
      inputRef.current[index + 1].focus();
    }
    setOtp(newOpt);

    let checkAllFiled = otp.every((item) => item != "");
    if (checkAllFiled) {
      onOtpSubmit(otp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    console.log("e", e.key);
    if (e.key === "Backspace") {
      const newOpt = [...otp];
      newOpt[index] = "";
      inputRef.current[index - 1].focus();
      setOtp(newOpt);
    }

    if (e.key === "ArrowLeft" && index >= 1) {
      inputRef.current[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handlepaste = (e) => {
    e.preventDefault();
    console.log("e.clipboard", e.clipboardData.getData("text"));
    const clipboradText = e.clipboardData.getData("text").trim();
    const values = clipboradText.split("");
    if (values.length === otp.length && /^\d+$/.test(clipboradText)) {
      setOtp(values);
    } else {
      alert("Invalid Error");
    }
  };

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  return (
    <div>
      {otp.length > 0 &&
        otp?.map((item, index) => (
          <input
            type="text"
            onChange={(e) => handleOnChange(e, index)}
            className="border-2 border-white h-8 w-8 text-center rounded-sm mx-2"
            maxLength={1}
            key={index}
            value={item}
            ref={(el: any) => (inputRef.current[index] = el)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlepaste}
            autoComplete="one-time-code"
          />
        ))}
    </div>
  );
};

// input field
// Map them
// focus on the fieldwhich is the current
// if all input fields are filled api call
//
