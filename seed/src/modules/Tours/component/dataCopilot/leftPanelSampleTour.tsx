import React from 'react';
import { Box, Card, Collapse, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getChatBotQuestions } from 'src/modules/DataCoPilot/api/DataCopilot';
import { ChatBotQuestions } from 'src/modules/DataCoPilot/model';
import { Button } from 'src/shared/components/button/Button';
import { useTranslation } from 'react-i18next';

const LeftSidePanel = () => {
  const { t } = useTranslation('averyAiChatBot');
  const [sampleQuestionList, setSampleQuestionList] = useState<
    ChatBotQuestions[]
  >([]);

  const [expanded, setExpanded] = useState({});

  const handleToggle = (categoryId) => {
    setExpanded((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  useEffect(() => {
    const fetchCategoryQuestions = async () => {
      const res: ChatBotQuestions[] = await getChatBotQuestions();
      const updatedRes = res.map((category, index) => ({
        ...category,
        expanded: index === 0 ? category?.id : ''
      }));
      setSampleQuestionList(updatedRes);
      setExpanded((prev) => ({
        ...prev,
        [updatedRes[0]?.id]: true
      }));
    };

    fetchCategoryQuestions();
  }, []);

  return (
    <Card sx={{ position: 'relative' }} className="leftTourPanel">
      <Box className="mt-18">
        <Button
          className="w-86 ml-20  btnFont mb-14 d-flex "
          variant="contained"
          type="submit"
          size={'small'}
          btnText={t('newChat')}
          startIcon={
            <Box
              sx={{ color: 'white', ml: -3 }}
              className="icon-plus iconStyle"
            />
          }
          sx={{ p: '18px' }}
        />
      </Box>
      <Box sx={{ py: 5 }}>
        <Box className="accordionList" sx={{ px: 3 }}>
          {sampleQuestionList.map((category) => (
            <React.Fragment key={category.id}>
              <Box
                className="accordionHeader"
                onClick={() => handleToggle(category.id)}
                sx={{
                  p: 2,
                  my: 4
                }}
              >
                <Typography
                  variant="subtitle2"
                  component="div"
                  className="textColor"
                  fontWeight={500}
                >
                  {category.category}
                </Typography>
                <Box className="arrowBox flex-basic-center">
                  <Box
                    className={
                      expanded[category.id]
                        ? 'icon-dropdown icon-rotate-top'
                        : 'icon-dropdown'
                    }
                  ></Box>
                </Box>
              </Box>

              <Collapse in={expanded[category.id]}>
                {category.question && category.question.length > 0 && (
                  <List disablePadding>
                    {category.question.map((action) => (
                      <ListItem
                        button
                        key={action.id}
                        onClick={() => {}}
                        className="accordion "
                        sx={{
                          pl: 4,
                          pr: 3,
                          pt: 3,
                          pb: 4,
                          mr: 2,
                          my: 1
                        }}
                      >
                        <Typography
                          className="accordionText"
                          component="div"
                          fontFamily={'400'}
                        >
                          {action.question}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Collapse>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default LeftSidePanel;
