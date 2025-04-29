import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ChatBotQuestions } from '../model';
import { useSampleContext } from './SampleQuestionContext';
import { RootState } from 'src/store/reducer';
import { useSelector } from 'react-redux';

interface SampleQuestionAccordionProps {
  sampleQuestionList: ChatBotQuestions[];
  hadUserAskedQuestion?: boolean;
}

export const SampleMockAccordion = ({
  sampleQuestionList,
  hadUserAskedQuestion
}: SampleQuestionAccordionProps) => {
  const { handleSampleQuestion } = useSampleContext();

  const initialExpandedState = sampleQuestionList.reduce((acc, category) => {
    acc[category.id] = category.expaned;
    return acc;
  }, {});

  const [expanded, setExpanded] = useState(initialExpandedState);

  const handleToggle = (categoryId) => {
    setExpanded((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  useEffect(() => {
    setExpanded((prev) => ({
      ...prev,
      [sampleQuestionList[0]?.id]: true
    }));
  }, [sampleQuestionList]);

  return (
    <Box className="accordionList" sx={{ px: 3 }}>
      {sampleQuestionList.map((category) => (
        <React.Fragment key={category.id}>
          <Box
            className="accordionHeader"
            onClick={() => handleToggle(category.id)}
            sx={{
              p: 2
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
            {expanded[category.id] ? (
              <ExpandLessIcon className="iconBg" />
            ) : (
              <ExpandMoreIcon className="iconBg" />
            )}
          </Box>

          <Collapse in={expanded[category.id]}>
            {category.question && category.question.length > 0 && (
              <List disablePadding>
                {category.question.map((action) => (
                  <ListItem
                    button
                    key={action.id}
                    onClick={() => {
                      if (!hadUserAskedQuestion) {
                        handleSampleQuestion(action);
                      }
                    }}
                    className="accordion"
                    sx={{
                      pl: 4,
                      pr: 3,
                      pt: 3,
                      pb: 4,
                      mx: 2,
                      my: 1,
                      '&:hover': {
                        bgcolor: '#f8f8f8'
                      }
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
  );
};

const SampleQuestionAccordion = ({ handleAccordion, hadUserAskedQuestion }) => {
  const [openSampleQuestion, setOpenSampleQuestion] = useState<boolean>(false);

  const sampleQuestions: [] | ChatBotQuestions[] = useSelector(
    (state: RootState) => state.dataCopilot.sampleQuestions
  );

  const { selectedSampleQuestion } = useSampleContext();

  const handleExpanded = () => {
    handleAccordion();
    setOpenSampleQuestion(!openSampleQuestion);
  };

  useEffect(() => {
    if (selectedSampleQuestion?.question) {
      handleExpanded();
    }
  }, [selectedSampleQuestion]);

  if (!openSampleQuestion) {
    return (
      <Box
        sx={{
          py: 3,
          px: 5
        }}
        className="d-flex flex-basic-space-between sampleQuestion rightIconFont"
        onClick={() => handleExpanded()}
      >
        <Typography variant="body1">Sample Reporting Questions</Typography>
        <ArrowForwardIosIcon className="iconBg " />
      </Box>
    );
  }

  return (
    <Box className="sampleQuestionAccordion">
      <Box
        sx={{ px: 5, py: 3, mb: 5 }}
        className="d-flex flex-basic-space-between "
        onClick={() => handleExpanded()}
      >
        <Typography className="header textweight" variant="body1">
          Sample Reporting Questions
        </Typography>
        <Box className="icon-dropdown  font-24"></Box>
      </Box>
      <SampleMockAccordion
        sampleQuestionList={sampleQuestions}
        hadUserAskedQuestion={hadUserAskedQuestion}
      />
    </Box>
  );
};

export default SampleQuestionAccordion;
