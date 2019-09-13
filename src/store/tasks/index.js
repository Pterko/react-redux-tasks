import { getTasks } from "../../api";

// Initial state
export const tasksInitialState = {
  isTasksLoading: false,
  isTasksLoadingFailed: false,
  tasks: [],
  tasksCount: 0,
  page: 1,
  isAddTaskPopupOpen: false,
  sortField: "id",
  sortDirection: "asc"
};

const TASK_LOADING_IN_PROGRESS = "TASK_LOADING_IN_PROGRESS";
const TASK_LOADING_FAILED = "TASK_LOADING_FAILED";
const TASK_LOADING_SUCCESS = "TASK_LOADING_SUCCESS";

const ADD_TASK_POPUP_OPEN = "ADD_TASK_POPUP_OPEN";
const ADD_TASK_POPUP_CLOSE = "ADD_TASK_POPUP_CLOSE";

const CHANGE_SORT = "CHANGE_SORT";

// Reducer
export default function userReducer(state = {}, action = {}) {
  switch (action.type) {
    case CHANGE_SORT:
      return {
        ...state,
        sortDirection: action.sortDirection,
        sortField: action.sortField
      };
    case TASK_LOADING_FAILED:
      return {
        ...state,
        isTasksLoading: false,
        isTasksLoadingFailed: true
      };
    case TASK_LOADING_IN_PROGRESS:
      return {
        ...state,
        isTasksLoading: true,
        isTasksLoadingFailed: false
      };
    case TASK_LOADING_SUCCESS:
      return {
        ...state,
        isTasksLoading: false,
        isTasksLoadingFailed: false,
        tasks: action.tasksObject.tasks,
        tasksCount: action.tasksObject.total_task_count,
        page: action.page
      };
    case ADD_TASK_POPUP_OPEN:
      return {
        ...state,
        isAddTaskPopupOpen: true
      };
    case ADD_TASK_POPUP_CLOSE:
      return {
        ...state,
        isAddTaskPopupOpen: false
      };
    default:
      return state;
  }
}

export function openAddTaskPopup() {
  return { type: ADD_TASK_POPUP_OPEN };
}

export function closeAddTaskPopup() {
  return { type: ADD_TASK_POPUP_CLOSE };
}

export function loadTasksFailed() {
  return {
    type: TASK_LOADING_FAILED
  };
}

export function loadTasksSuccess(tasksObject, page) {
  return {
    type: TASK_LOADING_SUCCESS,
    tasksObject,
    page
  };
}

export function loadTasksInProgress() {
  return {
    type: TASK_LOADING_IN_PROGRESS
  };
}

export function loadTasks(page) {
  return (dispatch, getState) => {
    dispatch(loadTasksInProgress());
    getTasks(page, getState().tasks.sortField, getState().tasks.sortDirection)
      .then(tasks => {
        dispatch(loadTasksSuccess(tasks, page));
      })
      .catch(() => {
        dispatch(loadTasksFailed());
      });
  };
}

export function changeSort(sortField, sortDirection) {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_SORT, sortField, sortDirection });
    dispatch(loadTasks(getState().tasks.page));
  };
}
