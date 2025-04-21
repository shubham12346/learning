import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

//To convert any string to title case
/**
 * @param value
 * @returns title case string
 */
export const titleCase = (value: string) => {
  if (!value) {
    return '';
  }
  return value.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
    c ? c.toUpperCase() : ' ' + d.toUpperCase()
  );
};

//To convert date string in specific format, by default MM/DD/YYYY
/**
 * @param date
 * @param format optional
 * @returns formated date
 */
export const formatDate = (date: string, format?: string) => {
  return date && dayjs(date).isValid()
    ? dayjs(date).format(format ? format : 'MM/DD/YYYY')
    : '';
};

//custom date formatting(Jan 01, 2023)
export const customDate = (dateString?: string) => {
  const event = new Date(dateString);
  const options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return event.toLocaleDateString(undefined, options);
};

// custom intl date format  8 Aug 2023

export const customInternationDate = (dateString?: string) => {
  const dateObj = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };
  const formattedDate = dateObj.toLocaleDateString('en-us', options);

  return formattedDate;
};

// custom intl date format  Augest 8, 2023

export const customInternationDate2 = (dateString?: any) => {
  const dateObj = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = dateObj.toLocaleDateString('en-us', options);
  return formattedDate;
};

export const customInternationDate3 = (dateString?: string) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date
  );
  const year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;
  return formattedDate;
};

// fromate date to mm/dd/yy like 11/02/23

export const formateDateLikeMMDDYY = (date) => {
  const dateObject = new Date(date);

  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear() % 100;

  const formattedDate = (day < 10 ? '0' : '') + day;
  const formattedMonth = (month < 10 ? '0' : '') + month;
  const formattedYear = (month < 10 ? '0' : '') + year;

  return `${formattedDate}/${formattedMonth}/${formattedYear}`;
};

//To convert date string to UTC in specific format, by default MM/DD/YYYY
/**
 * @param date
 * @param format optional
 * @returns formated utc date
 */
export const formatDateToUtc = (date: string, format?: string) => {
  dayjs.extend(utc);
  return dayjs(date).isValid()
    ? dayjs(date)
        .utc(true)
        .format(format ? format : 'MM/DD/YYYY')
    : '';
};

//To extract time from date string in specific format, by default hh:mm a
/**
 * @param date
 * @param format optional
 * @returns formated time
 */
export const getTimeStamp = (date: string, format?: string) => {
  return dayjs(date).isValid()
    ? dayjs(date).format(format ? format : 'hh:mm A')
    : '';
};

//Get the initials of any string value
/**
 * @param text
 * @returns initials of given text
 */
export const getInitials = (text: string) => {
  return text
    ? text
        .split(' ')
        .map((v) => v.slice(0, 1))
        .join('')
        .toUpperCase()
    : '';
};

//Remove underscore from any string value
/**
 * @param text
 * @returns given string without underscore
 */
export const removeUnderscore = (text: string) => {
  return text
    ? text.replace(/(?:_| |\b)(\w)/g, function ($1) {
        return $1.toUpperCase().replace('_', ' ');
      })
    : '';
};

//To conver bytes to kb
/**
 * @param value in bytes
 * @returns converted value in kb
 */
export const convertBytesToKb = (value: number) => {
  return value ? Math.round(value / Math.pow(1024, 1)) : 0;
};

//To get the today's date
/**
 * @returns current date in YYYY-MM-DD format
 */
export const getDate = () => {
  const today = new Date();
  const dayNum = today.getDate();
  const monthNum = today.getMonth() + 1;
  const yearNum = today.getFullYear();
  let day = dayNum.toString();
  let month = monthNum.toString();
  if (dayNum < 10) {
    day = '0' + dayNum;
  }

  if (monthNum < 10) {
    month = '0' + monthNum;
  }
  return `${yearNum}-${month}-${day}`;
};

//To convert hexa code to rgba format
/**
 * @param hex
 * @param opacity
 * @returns converted rgba value
 */
export const hexToRgbA = (hex: string, opacity: number) => {
  let colorData: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    colorData = hex.substring(1).split('');
    if (colorData.length == 3) {
      colorData = [
        colorData[0],
        colorData[0],
        colorData[1],
        colorData[1],
        colorData[2],
        colorData[2]
      ];
    }
    colorData = '0x' + colorData.join('');
    return (
      'rgba(' +
      [(colorData >> 16) & 255, (colorData >> 8) & 255, colorData & 255].join(
        ','
      ) +
      `,${opacity})`
    );
  }
  throw new Error('Bad Hex');
};

//To get the comma seperated values from array of string
/**
 * @param data
 * @returns Comma seperated string
 */
export const getCommaSeperatedValues = (data: string[]) => {
  return data?.length > 0 ? data?.toString()?.replaceAll(',', ', ') : '';
};

//status wise color
export enum StatusColor {
  'Created' = 'info',
  'Inprogress' = 'warning',
  'Pending Approval' = 'warning',
  'Approved' = 'success',
  'Cancelled' = 'error',
  'Pending Approval (Overdue)' = 'warning'
}

//status wise classes set
export enum StatusWiseClassSet {
  'Created' = 'createdTask',
  'In Progress' = 'inProgress',
  'Pending Approval' = 'pendingApproval',
  'Approved' = 'completedTask',
  'Cancelled' = 'deletedTask',
  'Overdue' = 'overDue',
  'Pending Approval (Overdue)' = 'pendingApprovalOverdue',
  'completed' = 'completedTask',
  'pending' = 'pendingApproval',
}

export enum chatbotStatus {
  'busy'='overDue',
  'offline'='deletedTask',
  'available' = 'completedTask'
}

//
export enum riskStatusTypeClassWise {
  'Critical' = 'criticalStatus',
  'High' = 'highStatus',
  'Medium' = 'mediumStatus',
  'Low' = 'lowTaskTag',
  'Undefined' = 'undefinedTaskTag'
}
//get remaining days
export enum RegulationTypeWiseClassSet {
  'library' = 'libraryTag',
  'final' = 'currentTag',
  'proposed' = 'proposedTag'
}

// task tag colors
export enum TaskTagColors {
  'Regulation' = 'regulationTaskTag',
  'Average Fine amount' = 'fineTaskTag',
  'No. of enforcement actions' = 'enforcementTaskTag'
}

export const getReaminingDays = (
  currentDate: any,
  targetDate: string
): number => {
  const startDate = new Date(currentDate);
  const endDate = new Date(targetDate);
  const days: any =
    Number(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  return Math.ceil(days);
};

export const checkTheDeadLine = (
  NumberOfDaysForDeadline: number,
  targetDate: string
): boolean => {
  const remainingDays = getReaminingDays(new Date(), targetDate);
  if (remainingDays <= NumberOfDaysForDeadline) {
    return true;
  }
  return false;
};

export const isFullNameValid = (input): boolean => {
  // Check if the input contains only numbers or symbols
  if (/^[0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,./]*$/.test(input)) {
    return false; // Invalid input
  }

  // Check if it starts with a letter, contains spaces, and includes numbers in between or contains only letters
  if (/^[A-Za-z][A-Za-z\s]*[0-9]/.test(input) || /^[A-Za-z\s]*$/.test(input)) {
    return true; // Valid input
  }

  return false; // Invalid input for all other cases
};

//date year
const currentYear = new Date().getFullYear();
export const startOfThisYear = new Date(currentYear, 0, 1);
export const endOf2099 = new Date(2099, 11, 31);

// to download a string as a text file

export const downloadStringAsTextFile = (
  textData: string,
  fileName = 'myFile.txt'
) => {
  const blob = new Blob([textData], { type: 'text/plain' });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  // cleaning the object
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
