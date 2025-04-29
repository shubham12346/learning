import { useState } from "react";

enum FileEnum {
  Folder = "folder",
  File = "file",
}
type fileType = {
  id: number;
  name: string;
  type: FileEnum.File | FileEnum.Folder;
  children?: fileType[] | undefined;
};

let rootFile: fileType[] = [
  {
    id: 1,
    name: "root",
    type: FileEnum.Folder,
    children: [
      { id: 11, name: "App.js", type: FileEnum.File },
      {
        id: 12,
        name: "component",
        type: FileEnum.Folder,
        children: [
          { id: 21, name: "File1.tsx", type: FileEnum.File },
          { id: 22, name: "File2.tsx", type: FileEnum.File },
          { id: 23, name: "File3.tsx", type: FileEnum.File },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "root2",
    type: FileEnum.Folder,
    children: [
      { id: 211, name: "App.js", type: FileEnum.File },
      {
        id: 212,
        name: "component",
        type: FileEnum.Folder,
        children: [{ id: 221, name: "File.tsx", type: FileEnum.File }],
      },
    ],
  },
  {
    id: 3,
    name: "config.ts",
    type: FileEnum.File,
  },
];

export const File = ({ name }: { name: string }) => {
  return (
    <div className="text-sm font-medium pl-1 border-l-2 border-white">
      {name}
    </div>
  );
};

export const Folder = ({ folders }: { folders: fileType }) => {
  if (!folders?.children?.length) {
    return <></>;
  }
  const [openFolders, setOpenFolders] = useState<Record<number, boolean>>({});

  const handleFolder = (id: number) => {
    const newOpenFolders = { ...openFolders };
    if (newOpenFolders[id]) {
      newOpenFolders[id] = !newOpenFolders[id];
    } else {
      newOpenFolders[id] = true;
    }
    setOpenFolders(newOpenFolders);
  };
  return (
    <div className="pl-1">
      {folders?.children.map((item: fileType) => (
        <div>
          {item?.type === FileEnum.File ? (
            <div className="flex">
              <File name={item?.name} key={item?.id} />
            </div>
          ) : (
            <div className="flex flex-col">
              <div
                onClick={() => {
                  handleFolder(item.id);
                }}
                className="cursor-pointer"
              >
                📁{item.name}
              </div>
              {openFolders[item.id] ? (
                <FoldersMap folders={item.children} />
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FoldersMap = ({ folders }: { folders: fileType[] | undefined }) => {
  if (folders?.length === 0) {
    return <></>;
  }
  return (
    <div className="pl-3">
      {folders?.map((item) => (
        <div>
          {item?.type === FileEnum.File ? (
            <div key={item.id} className="flex">
              <File name={item.name} />
            </div>
          ) : (
            <div className="flex flex-col">
              📁{item.name}
              <Folder folders={item} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
const FileExplorer = () => {
  return (
    <div>
      <h2>File Explorer </h2>
      <FoldersMap folders={rootFile} />
    </div>
  );
};

export default FileExplorer;
