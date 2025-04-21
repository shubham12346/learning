import { FormattedTaskTableData } from '../model/taskModel';

export const syncOptionList = [
  { id: 1, name: 'Microsoft Calendar', isSynced: true }
];

export const CALENDAR = 'calendar';

export const flatTaskForCalendarComponent = (events, parentTask = null) => {
  let flatArray = [];
  for (let index = 0; index < events.length; index++) {
    if (events[index]?.taskVersion?.length > 0) {
      const remaining = flatTaskForCalendarComponent(
        events[index]?.taskVersion,
        events[index]
      );
      flatArray.push(...remaining);
    } else {
      let task = {
        id: parentTask?.taskUid,
        eventTitle: events[index]?.title,
        description: events[index]?.description,
        start: new Date(Date.parse(events[index]?.targetDate)),
        end: new Date(Date.parse(events[index]?.targetDate)),
        regulatoryBody: parentTask?.regulatoryBody,
        navigateLink: '',
        actionPlanId: parentTask?.actionPlanId,
        taskType: parentTask?.taskType,
        taskId: parentTask?.taskId,
        gapAssessmentId: parentTask?.gapAssessmentId,
        taskOccurrenceId: events[index]?.taskOccurrenceUid
      };

      flatArray.push(task);
    }
  }
  return flatArray;
};

export const flatTaskforTableComponent = (events, parentTask = null) => {
  let flatArray = [];
  for (let index = 0; index < events.length; index++) {
    if (events[index]?.taskVersion?.length > 0) {
      const remaining = flatTaskforTableComponent(
        events[index]?.taskVersion,
        events[index]
      );
      flatArray.push(...remaining);
    } else {
      let task = {
        id: parentTask?.taskUid,
        agency: parentTask.regulatoryBody || '-',
        regulation: parentTask?.regulationName || '-',
        owner: parentTask?.owner?.userName,
        taskname: events[index].title,
        status: parentTask.taskStatus?.displayName,
        targetdate: events[index]?.targetDate,
        actionPlanId: parentTask?.actionPlanId,
        taskType: parentTask?.taskType,
        taskId: parentTask?.taskId,
        gapAssessmentId: parentTask?.gapAssessmentId,
        taskCadence: parentTask?.taskCadence,
        taskOccurrenceId: events[index].taskOccurrenceUid
      };
      flatArray.push(task);
    }
  }
  return flatArray;
};

export const formatTasksAndVersions = (
  data: any[],
  mainrow = null
): FormattedTaskTableData => {
  const mainRows = [];
  const nestedRowsMap = {};

  data.forEach((item) => {
    const {
      taskUid,
      regulatoryBody,
      regulationName,
      title,
      actionPlanId,
      taskType,
      taskId,
      gapAssessmentId,
      occurrenceCount,
      taskVersion,
      taskStatus,
      owner,
      taskCadence,
      taskTargetDate
    } = item;

    // Main row object
    const mainRow = {
      id: taskUid,
      agency: mainrow?.regulatoryBody || regulatoryBody || '-',
      regulation: mainrow?.regulationName || regulationName || '-',
      taskTitle: title,
      actionPlanId,
      taskType,
      taskId,
      gapAssessmentId
    };

    mainRows.push(mainRow);

    // Group nested rows by taskUid
    nestedRowsMap[taskUid] = (taskVersion || []).map((version) => ({
      id: version.taskOccurrenceUid,
      owner:
        occurrenceCount > 1
          ? version?.owner?.userName || '-'
          : owner?.userName || '-',
      taskname: version.title || '-',
      status:
        occurrenceCount > 1
          ? version?.taskStatus?.displayName || '-'
          : taskStatus?.displayName || '-',
      targetdate: taskTargetDate,
      taskCadence:
        occurrenceCount > 1
          ? version?.taskCadence?.displayName || '-'
          : taskCadence?.displayName || '-',
      createdDate: version?.createdDate || null, // Optional field if needed,
      taskType,
      taskId,
      taskUid,
      gapAssessmentId
    }));
  });

  return {
    mainRows,
    nestedRowsMap
  };
};
