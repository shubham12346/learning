import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import ErrorBoundary from 'src/shared/components/errorComponent/ErrorBoundary';
import {
  setUserPermissionInTaskModule,
  taskScreenType
} from './services/task.service';
import TaskAndCalendarView from './component/TaskAndCalendarView';
import AddTaskView from './component/AddTaskView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { useEffect } from 'react';

const Tasks = (props) => {
  const { actions } = props;
  const screenType = useSelector(
    (state: RootState) => state?.tasks?.screenType
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleRedirect();
    dispatch(setUserPermissionInTaskModule(actions));
  }, []);

  const handleRedirect = () => {
    dispatch({
      type: 'tasks/selectCurrentScreen',
      payload: 'TaskAndCalendarView'
    });
  };

  const renderComponent = (screenType: taskScreenType) => {
    switch (screenType) {
      case 'AddTaskView':
        return <AddTaskView />;
      case 'TaskAndCalendarView':
        return <TaskAndCalendarView />;
      default:
    }
  };
  return (
    <ErrorBoundary>
      <Box className="taskWrapper ">
        <Container maxWidth={'xl'}>
          <Box>{renderComponent(screenType)}</Box>
        </Container>
      </Box>
    </ErrorBoundary>
  );
};

export default Tasks;
