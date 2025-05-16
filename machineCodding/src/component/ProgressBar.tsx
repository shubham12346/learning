import { useState } from "react";

const ProgressBarComponent = (props: {
  progress: number;
  backgroundColor: string;
  progressColor: string;
}) => {
  const {
    progress = 10,
    backgroundColor = "bg-white",
    progressColor = "bg-blue-400",
  } = props;
  return (
    <div>
      <div className={backgroundColor + `  w-[600px] h-[50px]`}>
        <div
          className={
            progressColor +
            ` border-2 border-white h-[20px] ${
              progress > 0 ? `transition-all duration-300` : ""
            }`
          }
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleClick = (e) => {
    console.log("e", e.target.files);
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || isUploading) {
      return;
    }

    // setProgress((prev) => {});
    setIsUploading(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="text-white">
      progressBar
      <div className="p-4 m-4 ">
        <span className="p-4 m-4 "> upload file</span>

        <input
          type="file"
          name=""
          className="bg-white text-black"
          id=""
          onChange={handleClick}
        />
      </div>
      <ProgressBarComponent
        backgroundColor="bg-white"
        progress={progress}
        progressColor="bg-blue-400"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-blue-400 p-4 m-4"
      >
        Upload File
      </button>
    </div>
  );
};

export default ProgressBar;
