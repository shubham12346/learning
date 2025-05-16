const breadCrumb = () => {
  const breadCrum = [
    { id: 3, parentId: 12, title: "Headphones" },
    { id: 19, parentId: 28, title: "True wireless" },
    { id: 28, parentId: 3, title: "Wired" },
    { id: 12, parentId: null, title: "Audio" },
    { id: null, parentId: 19, title: "Bluetooth" },
  ];
  const getBreadCrumbPath = (breadCrumbs: any) => {
    let itemIdObj = {};
    let rootEle;
    breadCrumbs.forEach((item: any) => {
      itemIdObj[item?.id] = item;
      if (item?.id == null) {
        rootEle = item;
      }
    });
    let paths = [];
    let currentEle: any = rootEle;
    while (currentEle) {
      paths.unshift(currentEle?.title);
      if (currentEle?.parentId) {
        currentEle = itemIdObj[currentEle?.parentId];
      } else {
        currentEle = null;
      }
    }
    return paths.join(" >> ");
  };
  const path = getBreadCrumbPath(breadCrum);
  console.log(path);

  return (
    <div className="text-white">
      BreadCrumb
      <div>{`${path}`}</div>
    </div>
  );
};

export default breadCrumb;
