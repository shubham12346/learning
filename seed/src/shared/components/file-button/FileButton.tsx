import { Button as MuiButton } from '@mui/material';

import { CombinedProps } from './services/fileButtonInterface';

export const FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'video/mp4',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'image/jpeg',
  'image/png',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export const FileButton = ({
  fileType,
  variant,
  label,
  isMultipleFile,
  onChange,
  ...props
}: CombinedProps) => {
  const acceptedTypes = FILE_TYPES.toString();

  const handleChangeFile = (event: any): void => {
    event.persist();

    const filesList = event.target.files;
    let result: typeof filesList;
    if (filesList.length) {
      const arrFiles = Array.from(filesList);
      // ToDo - need to be modified
      // const fileName: Array<string> = [];

      result = arrFiles.filter((file: any, index: number): any => {
        const fileType: string = file.type;
        if (FILE_TYPES.includes(fileType)) {
          // if (arrFiles.length > index) {
          //   fileName.push(file.name);
          // }
          return { file, id: index };
        }
      });
    }
    onChange(result);
  };

  return (
    <div>
      <input
        accept={acceptedTypes}
        id="button-file"
        multiple={isMultipleFile}
        type="file"
        onChange={(e) => handleChangeFile(e)}
      />
      <label htmlFor="button-file">
        <MuiButton {...props} variant={variant} component="span">
          {label}
        </MuiButton>
      </label>
    </div>
  );
};
