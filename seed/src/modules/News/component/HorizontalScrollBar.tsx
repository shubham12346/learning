import React, { useRef, useEffect } from 'react';

interface HorizontalScrollBarProps {
  children: React.ReactNode;
}

const AddScrollBar: React.FC<HorizontalScrollBarProps> = ({ children }) => {
  return (
    <div style={{ overflowX: 'scroll' }} className="taskScroll">
      {children}
    </div>
  );
};

export default AddScrollBar;
