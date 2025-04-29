import { Cadence } from "src/shared/constants/constants";

// Handle Single Check and Uncheck
export const handleCheckUncheck = (
  selectedFilter: { [x: string]: any },
  item: any
) => {
  if (item.name in selectedFilter) {
    let array = selectedFilter[item.name];
    let filterArray = [];
    if (array.some((ele: { value: any }) => ele.value === item.value)) {
      filterArray = array.filter((ele: { value: any }) => ele.value !== item.value);
    } else {
      filterArray = [...array, item];
    }
    return { ...selectedFilter, [item.name]: filterArray };
  } else {
    return { ...selectedFilter, [item.name]: [item] };
  }
};

// Remove element from both Array
// pass selectFilterValue and selectedFilter
export const removeFilterElement = (
  selectedFilterValue,
  selectedFilter,
  ele: any
) => {
  const updatedFilterValue = selectedFilterValue.filter(
    (item: { value: any }) => item.value !== ele.value
  );
  let keyName: any = ele.name;
  let selectedList = selectedFilter[keyName];
  const updatedFilterArray = selectedList.filter((item) => item.value !== ele.value);
  const updatedFilter = { ...selectedFilter, [keyName]: updatedFilterArray };

  return { updatedFilterValue, updatedFilter };
};

// Create Flat list by object containing array
export const createFlatListByObjectKeys = (selectedFilter: any) => {
  const objectKeys: any = Object.keys(selectedFilter);
  let flatList = [];
  if (objectKeys.length) {
    for (let i = 0; i < objectKeys.length; i++) {
      flatList= [...flatList, ...selectedFilter[objectKeys[i]]];
    }
  }
  return flatList;
};

export const getMaxTargetDate = (createdDate, cadence) => {
  const date = new Date(createdDate);
  let maxDate;

  switch (cadence) {
    case Cadence.WEEKLY:
      maxDate = new Date(date);
      maxDate.setDate(date.getDate() + 7);
      break;

    case Cadence.MONTHLY:
      maxDate = new Date(date);
      maxDate.setMonth(date.getMonth() + 1);
      break;

    case Cadence.QUARTERLY:
      maxDate = new Date(date);
      maxDate.setMonth(date.getMonth() + 3);
      break;

    case Cadence.YEARLY:
      maxDate = new Date(date);
      maxDate.setFullYear(date.getFullYear() + 1);
      break;

    case Cadence.NO_RECURRENCE:
      maxDate = new Date(date.getFullYear(), 11, 31);
      break;

    default:
      maxDate = new Date(date.getFullYear(), 11, 31);
  }

  return maxDate.toISOString();
};
