export type FilePreviewType = {
  id?: string;
  file?: any;
  name: string;
  size: number;
  type: string;
  preview: string;
  lastModifiedDate?: any;
  fileName?: string;
  uploadedAt?: string;
};

export interface SingleOrMultipleUploadProps {
  children: React.ReactNode;
  acceptedFileFormat: string[];
  uploadedFiles: any[];
  maxFileSize: number;
  maxFilesToUpload?: number;
  isMultiple?: boolean;
  setSingleData?: (data: FilePreviewType) => void;
  setMultipleData?: (
    file: FilePreviewType[],
    oldFiles: FilePreviewType[]
  ) => void;
  isUploadDisabled?:boolean;
}
