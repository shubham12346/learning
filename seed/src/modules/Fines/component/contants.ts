export const getBigNumbersToK_M_B_format = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + ' B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + ' M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + ' K';
  } else {
    return num;
  }
};

export const DEFAULT_YEAR = new Date().getFullYear().toString();
export const DEFAULT_MAX_DATE = new Date(
  new Date().getFullYear(),
  11,
  31
).toISOString();
