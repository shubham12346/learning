import { Box, Tooltip, Typography } from '@mui/material';

export type InputReadonlyAndDownloadType = {
  id?: string;
  title: string;
  value: string;
  handleExpand: ({ value, title }) => void;
  handleDownload: (id: string, url: string, textValue?: string) => void;
  inputBgClass?: string;
  downloadUrl?: string;
  expandArrowTooltip?: string;
  downloadIconTooltip?: string;
};

const InputReadonlyAndDownload = (props: InputReadonlyAndDownloadType) => {
  const {
    title,
    handleExpand,
    id,
    handleDownload,
    downloadUrl = '',
    value,
    inputBgClass = 'normalInputBg',
    expandArrowTooltip = 'Expand',
    downloadIconTooltip = 'Download'
  } = props;

  return (
    <Box className="inputReadonlyAndDownload" sx={{ mb: 7 }}>
      <Box
        className="inputTitle d-flex flex-basic-space-between"
        sx={{ mb: 1.5 }}
      >
        <Typography variant="body2" className="textSemiWeight">
          {title}
        </Typography>
        <Box className="icons d-flex">
          <Box sx={{ pr: 3 }}>
            <Tooltip title={expandArrowTooltip} arrow>
              <Box
                onClick={() => {
                  handleExpand({ value: value, title: title });
                }}
                className="inputReadonlyExpandIcon normalInputBg flex-basic-center cursorPointer "
              >
                <Box className="icon-expand iconStyle"></Box>
              </Box>
            </Tooltip>
          </Box>
          <Tooltip title={downloadIconTooltip} arrow>
            <Box
              onClick={() => {
                if (value) {
                  handleDownload(id, downloadUrl, value);
                }
              }}
              className="inputReadonlyExpandIcon normalInputBg flex-basic-center cursorPointer "
            >
              <Box className="icon-download iconStyle" />
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box className={`inputBox ${inputBgClass}`} sx={{ py: 3, px: 6 }}>
        <Typography className="ellipseText minHeight">{value}</Typography>
      </Box>
    </Box>
  );
};

export default InputReadonlyAndDownload;
