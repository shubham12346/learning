import { useState } from "react";
import ReactMarkdown from "react-markdown";
import markdownContent from "../assets/checkBoxMardown";

type Node = {
  id: number;
  label: string;
  children?: Node[];
};

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

  const updateParent = (
    node: Node | undefined,
    newCheckedItems: Record<number, boolean>
  ) => {
    if (!node || !node.children) return;
    const allChecked = node?.children?.every(
      (item) => newCheckedItems[item.id]
    );
    console.log("node", allChecked);
    newCheckedItems[node.id] = allChecked;
  };

  const handleOnChange = (node: Node, parent?: Node) => {
    const newCheckedItems = { ...checkedItems };
    const isChecked = !checkedItems[node.id];

    updateChildren(node, isChecked, newCheckedItems);
    updateParent(parent, newCheckedItems);
    setCheckedItems(newCheckedItems);
  };
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

  return (
    <>
      <div>
        <div> {data?.map((item) => renderCheckBox(item))}</div>
        <div>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default CheckBox;
