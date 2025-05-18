import { useState, useRef, useMemo } from "react";
import { FixedSizeList as List } from "react-window";

const listWithViisulation = () => {
  const items = Array.from({ length: 2000 }, (_, i) => `ITEM-${i}`);

  return (
    <div className="text-white h-full">
      <h1>List with Visulation with custom hook </h1>
      <pre>
        {`while making a simple data list virtualization 

          step 1 : pass component ,height , each Item height  and total items 
          step 2 : calculate virtualization elements 

            such as 
          totalHeight = itemHeight * total items ( creates an empty hollow div the height to contain all elements )
          virtualItemNumber = (height/ itemHeight) number of items to be shown on the ui 
          startIndex 
          endIndex 
          virtualItems = items.slice(startIndex,endIndex+10)

          div style ={{ height :height;, overflow: auto  }}
            div style ={{height : toatlHeight }}  
              {
                virtiualItems.map((item,index)=> 
                  const realIndex = startIndex+index ;
                    div style ={{ postion:'absolute',top: realIndex * itemHeight,left :0,right:0	  }}
                  )
              }
        `}
      </pre>
      <VirtualList items={items} itemHeight={40} height={400} />;
      <h2> List virtualization with react window </h2>
      <VisrtualListWithWindow height={400} itemHeight={150} items={items} />
      <h2>A normal table</h2>
      <VirtualizationForAtable />
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

const VisrtualListWithWindow = ({ items, itemHeight, height }) => {
  const Row = ({ index, style }) => <div style={style}>Row {index}</div>;
  return (
    <List height={height} itemCount={items.length} itemSize={35} width={300}>
      {Row}
    </List>
  );
};

const VirtualizationForAtable = () => {
  const columns = ["Id", "Name"];
  const data = Array.from({ length: 1000 }).map((_, index) => {
    return {
      Id: index + 1,
      Name: `User ${index + 1}`,
    };
  });

  const TableRow = ({ index, style }) => (
    <div
      style={{ ...style, display: "flex", color: "white" }}
      className="text-white"
    >
      <div style={{ width: "50%" }}>{data[index].Id}</div>
      <div style={{ width: "50%" }}>{data[index].Name}</div>
    </div>
  );
  return (
    <>
      <div>
        {columns?.map((col, Index) => (
          <div key={Index}>{col} </div>
        ))}
      </div>
      <List height={400} itemCount={data.length} itemSize={35} width={300}>
        {TableRow}
      </List>
    </>
  );
};
