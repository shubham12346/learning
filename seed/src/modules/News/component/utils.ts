export const convertIntoFiltersOptionsArrayType = (appliedFilter: any[]) => {
  let createOptonList: any = [];

  appliedFilter?.forEach((item: any) => {
    createOptonList.push(
      ...item?.newsCategory?.map((item) => {
        return {
          label: item.displayName,
          id: item.id,
          value: item.name
        };
      })
    );
  });

  const uniqueData = createOptonList?.filter((item, index, self) => {
    // Use findIndex to check if there's another object with the same id before the current index.
    return self.findIndex((obj) => obj.id === item.id) === index;
  });

  return uniqueData;
};
