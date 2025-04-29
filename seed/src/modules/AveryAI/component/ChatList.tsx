import { Box, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChatList = (props) => {
  const {
    title,
    list,
    handleEdit,
    isEdit,
    handleDelete,
    handleSelected,
    setEdit
  } = props;
  const [itemTitle, setItemTitle] = useState(isEdit?.title);
  const { t } = useTranslation('averyAiChatBot');
  // set previous value in input box and set the id of element
  const setInititalValue = (event, id, title) => {
    event.stopPropagation();
    setEdit(id, title);
  };

  // handle chat title change
  const handleChange = (event) => {
    event.stopPropagation();
    setItemTitle(event.target.value);
  };

  // handle key press enter
  const handlEnterKey = (event, item) => {
    if (event.key === 'Enter' && itemTitle) {
      handleEdit(event, item);
      setEdit('', '');
    }
  };
  // hanlde click on input field
  const handleClickOnTextField = (event) => {
    event.stopPropagation();
  };

  //handle selected item

  const handleSelectedItem = (item) => {
    handleSelected(item);
    setItemTitle(item?.title || item?.sessionTitle);
    setEdit('', '');
  };

  return (
    <Box className="chats ml-18 mr-18 ">
      <Typography className="title mb-18 mt-18">{title}</Typography>
      {list?.map((item) => (
        <Box
          key={item?.id}
          className="d-flex flex-basic-space-between item mb-12 p-16"
          onClick={() => {
            handleSelectedItem(item);
          }}
          onBlur={() => {
            handleSelectedItem({});
          }}
        >
          {item?.id === isEdit.id ? (
            <Tooltip title={t('enterToSave')} arrow enterDelay={2000}>
              <TextField
                // variant="outlined"
                autoFocus
                value={itemTitle}
                onClick={handleClickOnTextField}
                onChange={handleChange}
                onKeyDown={(event) => {
                  handlEnterKey(event, item);
                }}
                autoComplete="off"
              />
            </Tooltip>
          ) : (
            <>
              {item?.sessionTitle?.length >= 15 ? (
                <Tooltip title={item?.sessionTitle} arrow>
                  <Typography className="w-85 sessionTitle text-ellipsis">
                    {item?.sessionTitle}
                  </Typography>
                </Tooltip>
              ) : (
                <Typography className="w-85 sessionTitle text-ellipsis">
                  {item?.sessionTitle}
                </Typography>
              )}
            </>
          )}
          {item?.id !== isEdit && (
            <Box className="buttonControl">
              <Box className="d-flex">
                <Box
                  className="flex-basic-center"
                  onClick={(event) => {
                    setInititalValue(event, item?.id, item?.sessionTitle);
                  }}
                  sx={{ mr: 4 }}
                >
                  <span className="icon-ic_edit_chat iconStyle"></span>
                </Box>
                <Box
                  className="flex-basic-center"
                  onClick={(event) => {
                    handleDelete(event, item);
                  }}
                >
                  <span className="icon-trash iconStyle"></span>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ChatList;
