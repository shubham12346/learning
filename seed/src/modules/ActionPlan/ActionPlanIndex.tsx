import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import ActionPlanDetails from './component/ActionPlanDetail';
import { useParams } from 'react-router-dom';
import { getGenerateActionPlanForRegulation } from './api/actionplanApi';
import { ActionPlanOverviewType } from '../Regulations/model/RegulationsInterface';

const ActionPlan = (props) => {
  //const
  let timer;
  let { regId } = useParams();
  const { actions } = props;

  //state varibles
  const [generatedActionPlanDetail, setGeneratedActionPlanDetail] =
    useState<ActionPlanOverviewType>();
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [taskListLoader, setTaskListLoader] = useState(false);

  const getDetailsOfGenerateActionPlan = async (regulationId, param) => {
    let respData = await getGenerateActionPlanForRegulation(
      regulationId,
      param
    );
    setGeneratedActionPlanDetail(respData);
    setIsShowLoader(false);
    setTaskListLoader(false);
  };

  //useeffects
  useEffect(() => {
    setIsShowLoader(true);
    timer = setTimeout(() => {
      getDetailsOfGenerateActionPlan(regId, {});
    }, 500);

    return () => clearTimeout(timer);
  }, [regId]);

  //methods
  const getUpdatedActionPlanDetails = (param) => {
    setTaskListLoader(true);
    getDetailsOfGenerateActionPlan(regId, param);
  };

  return (
    <Box className="actionPlanView">
      <Container maxWidth={'xl'}>
        <ActionPlanDetails
          generatedActionPlanDetail={generatedActionPlanDetail}
          isShowLoader={isShowLoader}
          getUpdatedActionPlanDetails={getUpdatedActionPlanDetails}
          actions={actions}
          taskListLoader={taskListLoader}
        />
      </Container>
    </Box>
  );
};

export default ActionPlan;
