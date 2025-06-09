import { useLayoutEffect, useRef } from "react";

const AnimationHooks = () => {
  const boxRef = useRef<any>(null);

  useLayoutEffect(() => {
    const { width } = boxRef.current.getBoundingClientRect();
    console.log("Box width:", width);
  }, []);
  return (
    <div>
      AnimationHooks
      <div></div>
      <div
        ref={boxRef}
        style={{ width: "50%", height: 100, background: "skyblue" }}
      >
        Measure Me
      </div>
      ;
    </div>
  );
};

export default AnimationHooks;
