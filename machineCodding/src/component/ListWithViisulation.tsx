import { useState, useRef } from "react";

const listWithViisulation = () => {
  const items = Array.from({ length: 20000 }, (_, i) => `Item ${i + 1}`);

  return (
    <div>
      <h1>List with Visulation</h1>
      <VirtualList items={items} itemHeight={40} height={400} />;
    </div>
  );
};

export default listWithViisulation;

const VirtualList = ({ items, itemHeight, height }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount + 1);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ overflowY: "auto", height, border: "1px solid #ccc" }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, index) => {
          const realIndex = startIndex + index;
          return (
            <div
              key={realIndex}
              style={{
                position: "absolute",
                top: realIndex * itemHeight,
                height: itemHeight,
                left: 0,
                right: 0,
                padding: "8px",
                boxSizing: "border-box",
                borderBottom: "1px solid #eee",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
