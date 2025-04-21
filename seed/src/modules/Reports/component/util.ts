export const getTimeStampName = (startWord) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
  return `${startWord}_${formattedDate}_${formattedTime}`;
};

export const checkLengthOfAText = (text) => {
  if (text?.length <= 2) {
    return 'Name must be at least 3 characters';
  } else if (text?.length >= 50) {
    return 'Name must not exceed 50 characters';
  }
  return '';
};

export const GAP_OPTIONS = [
  { id: 'yes', name: 'Present' },
  { id: 'no', name: 'Absent' }
];
