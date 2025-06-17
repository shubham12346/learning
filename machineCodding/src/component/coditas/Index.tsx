import { useState } from "react";

const Index = () => {
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileUpload = (e) => {
    // console.log("e", e.target.files);
    // console.log(e.target.files);

    const files = Array.from(e.target.files);
    setFile(files);
    const newFiles = files.map((file) => {
      return {
        url: URL.createObjectURL(file),
        type: file?.type,
        name: file?.name,
      };
    });
    setPreview(newFiles);
  };

  console.log("preview", preview);

  const handleKeyPress = (e) => {
    console.log("key", e.key);

    if (e.key === "ArrowRight") {
      if (currentIndex < file.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
    if (e.key === "ArrowLeft") {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };
  return (
    <div>
      <h2 className="text-white">File upload and index</h2>
      <div>
        <input
          className="py-2 text-black bg-white"
          onChange={handleFileUpload}
          multiple
          type="file"
        />
      </div>
      <div
        className=" w-[1000px] overflow-hidden  focus:outline-none"
        onKeyDown={handleKeyPress}
        tabIndex={0}
        // Makes the div focusable
      >
        <div className="flex border-2 border-white my-10 ">
          {preview.map((item, index) => (
            <div
              key={index}
              className={`w-[1000px] `}
              style={{
                transform: `translateX(-${currentIndex * 1000}px)`,
                transition: "ease-in-out 0.3s  ",
              }}
            >
              <iframe src={item.url} className="m-5 p-4 w-[950px] h-[500px]" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setCurrentIndex((prev) => (prev === 1 ? 0 : 1));
        }}
        className="text-white border-1 border-white px-5 py-2"
      >
        Next - {currentIndex}
      </button>
    </div>
  );
};

export default Index;
