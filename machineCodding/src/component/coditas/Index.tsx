import OtpComponent from "./OtpComponent";
import FileUpload from "./FileUpload";
import PollComponent from "./PollComponent";
import { AnalogClock } from "./AnalogClock";

const Index = () => {
  return (
    <>
      <FileUpload />
      <OtpComponent />
      <PollComponent />
      <AnalogClock />
    </>
  );
};

export default Index;
