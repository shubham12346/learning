export const ACCEPTABLE_FILE_FORMAT = [
  'application/pdf',
  'application/msword',
  'application/msexcel',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/csv',
  'text/plain'
];


export const TagLists = [
  { id: 1, name: 'Annual Policy & Procedure Review' },
  { id: 2, name: '206(4)-7 Policy & Procedure' },
  { id: 3, name: '3120 Policy & Procedure' }
];

export const getErrorMessage = (causeError) => {
  if (typeof causeError === 'object' && causeError?.length >= 0) {
    return causeError[0];
  }
  return causeError || '';
};
