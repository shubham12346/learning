import { forwardRef, useRef } from "react";

const CircleWithCursor = () => {
  const parentRef = useRef<any>(null);
  const childRef = useRef<any>(null);
  const onMouseIn = (e) => {
    if (childRef.current === null || parentRef.current === null) {
      return;
    }
    const parentRect = parentRef.current.getBoundingClientRect();
    console.log("parentBound", parentRect);
    console.log("wclient x ", e.clientX);
    console.log("clinet hy", e.clientY);
    childRef.current.style.top = `${e.clientY}px`;
    childRef.current.style.left = `${e.clientX}px`;
  };
  return (
    <div>
      CircleWithCursor
      <div
        className="min-h-[70vh] min-w-[70vw] border-white border-2 relative"
        ref={parentRef}
        onMouseMove={onMouseIn}
      >
        <Circle ref={childRef} />
      </div>
    </div>
  );
};

const Circle = forwardRef((props, ref) => {
  return (
    <div
      className={`h-10 w-10 rounded-full bg-red-500 absolute `}
      ref={ref}
      style={{ transform: "translate(-50%, -50%)" }}
    ></div>
  );
});

export default CircleWithCursor;
