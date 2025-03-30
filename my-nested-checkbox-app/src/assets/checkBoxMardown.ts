const markdownContent = `
# Nested Checkbox with DFS in React

## Overview
This React component implements a nested checkbox system using Depth-First Search (DFS) to manage parent-child relationships efficiently. When a parent is selected, all its children get selected. If all children of a parent are selected, the parent gets automatically selected. Unchecking any child updates its parent accordingly.

## Code Implementation

### **Component: \`CheckBox.tsx\`**
\`\`\`tsx
import { useState } from "react";

// Define the Node type
type Node = {
  id: number;
  label: string;
  children?: Node[];
};

// Sample hierarchical data
const data: Node[] = [
  {
    id: 1,
    label: "Parent 1",
    children: [
      { id: 2, label: "Child 1" },
      { id: 3, label: "Child 2" },
    ],
  },
  {
    id: 4,
    label: "Parent 2",
    children: [
      { id: 5, label: "Child 3" },
      {
        id: 6,
        label: "Child 4",
        children: [{ id: 7, label: "Sub Child 1" }],
      },
    ],
  },
];

const CheckBox = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // DFS function to update all children
  const updateChildren = (
    node: Node,
    isChecked: boolean,
    newCheckedItems: Record<number, boolean>
  ) => {
    newCheckedItems[node.id] = isChecked;
    node.children?.forEach((child) =>
      updateChildren(child, isChecked, newCheckedItems)
    );
  };

  // DFS function to update parent based on child states
  const updateParent = (
    node: Node | undefined,
    newCheckedItems: Record<number, boolean>
  ) => {
    if (!node || !node.children) return;
    const allChecked = node?.children?.every(
      (item) => newCheckedItems[item.id]
    );
    newCheckedItems[node.id] = allChecked;
  };

  // Handle checkbox change
  const handleOnChange = (node: Node, parent?: Node) => {
    const newCheckedItems = { ...checkedItems };
    const isChecked = !checkedItems[node.id];

    updateChildren(node, isChecked, newCheckedItems);
    updateParent(parent, newCheckedItems);
    setCheckedItems(newCheckedItems);
  };

  // Recursively render nested checkboxes
  const renderCheckBox = (node: Node, parent?: Node) => {
    return (
      <div key={node.id} style={{ marginLeft: "20px" }}>
        <label htmlFor={node.label}>
          <input
            type="checkbox"
            checked={!!checkedItems[node.id]}
            onChange={() => {
              handleOnChange(node, parent);
            }}
          />
          {node.label}
        </label>
        {node.children &&
          node.children?.map((child) => renderCheckBox(child, node))}
      </div>
    );
  };

  return <>{data?.map((item) => renderCheckBox(item))}</>;
};

export default CheckBox;
\`\`\`

## **How to Display in a React Page**
To use this component inside your React application, follow these steps:

### **1. Import the \`CheckBox\` Component**
In your main React component (e.g., \`App.tsx\`):
\`\`\`tsx
import React from "react";
import CheckBox from "./CheckBox";

const App = () => {
  return (
    <div>
      <h2>Nested Checkboxes Example</h2>
      <CheckBox />
    </div>
  );
};

export default App;
\`\`\`

### **2. Run Your React App**
Make sure your project is set up with **React and TypeScript**. If you haven't already, you can create a React TypeScript project using Vite:

\`\`\`sh
npm create vite@latest my-app --template react-ts
cd my-app
npm install
npm run dev
\`\`\`

If you already have a React project, just place \`CheckBox.tsx\` in your \`src\` folder and import it inside your main \`App.tsx\` file.

## **How It Works**
- Clicking a **parent** selects all its children.
- Clicking all children **automatically selects the parent**.
- Unchecking any child **unchecks the parent**.

This component efficiently maintains the nested checkbox states using **DFS (Depth-First Search)**.

## **Next Steps**
- ✅ Style checkboxes with CSS.
- ✅ Add animations for better UX.
- ✅ Store state in local storage for persistence.

🎉 **Now you have a working nested checkbox system in React!** 🚀
`;

export default markdownContent;
