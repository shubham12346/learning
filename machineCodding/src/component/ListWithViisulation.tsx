import { useState, useRef, useMemo } from "react";

const listWithViisulation = () => {
  const items = Array.from({ length: 2000 }, (_, i) => `ITEM-${i}`);

  return (
    <div>
      <h1>List with Visulation</h1>
      <VirtualList items={items} itemHeight={40} height={400} />;
    </div>
  );
};

export default listWithViisulation;

const VirtualList = ({ items, itemHeight, height }) => {
  const containerRef = useRef<any>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = itemHeight * items.length;
  const virtualLength = Math.ceil(scrollTop / itemHeight);
  const startIndex = Math.max(0, virtualLength);
  const endIndex = Math.min(items.length - 1, startIndex + virtualLength + 10);

  const virtualItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      style={{ height: height, overflow: "auto", border: "1px solid #eee" }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {virtualItems?.map((virtualizedItems, index) => {
          const realIndex = index + startIndex;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${realIndex * itemHeight}px`,
                height: itemHeight + "px",
                padding: "8px",
                boxSizing: "border-box",
                borderBottom: "1px solid #eee",
              }}
            >
              {virtualizedItems}
            </div>
          );
        })}
      </div>
    </div>
  );
};
