import { getTasks, editTask as editTaskApi } from "../../api";

import { SuccessToaster, ErrorToaster } from "../../components/UI/atoms";

import { logout } from "../user";

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
const TASK_LOADING_FAILURE = "TASK_LOADING_FAILURE";
const TASK_LOADING_SUCCESS = "TASK_LOADING_SUCCESS";

const ADD_TASK_POPUP_OPEN = "ADD_TASK_POPUP_OPEN";
const ADD_TASK_POPUP_CLOSE = "ADD_TASK_POPUP_CLOSE";

const CHANGE_SORT = "CHANGE_SORT";

const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
const EDIT_TASK_FAILURE = "EDIT_TASK_FAILURE";

// Reducer
export default function userReducer(state = {}, action = {}) {
  switch (action.type) {
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.taskId
            ? {
                id: action.taskId,
                email: task.email,
                username: task.username,
                text: action.text ? action.text : task.text,
                status:
                  action.status || action.status === 0
                    ? action.status
                    : task.status
              }
            : task
        )
      };
    case CHANGE_SORT:
      return {
        ...state,
        sortDirection: action.sortDirection,
        sortField: action.sortField
      };
    case TASK_LOADING_FAILURE:
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

export function loadTasksFailure() {
  return {
    type: TASK_LOADING_FAILURE
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
    const usedPage = page || getState().tasks.page;

    getTasks(
      usedPage,
      getState().tasks.sortField,
      getState().tasks.sortDirection
    )
      .then(tasks => {
        dispatch(loadTasksSuccess(tasks, usedPage));
      })
      .catch(() => {
        dispatch(loadTasksFailure());
      });
  };
}

export function changeSort(sortField, sortDirection) {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_SORT, sortField, sortDirection });
    dispatch(loadTasks(getState().tasks.page));
  };
}

export function editTaskSuccess(result, taskId, text, status) {
  SuccessToaster.showIntent({ message: "Задача успешно отредактирована" });
  return { type: EDIT_TASK_SUCCESS, taskId, text, status };
}

export function editTaskFailure(dispatch, errResult) {
  if (errResult && errResult.message && errResult.message.token) {
    ErrorToaster.showIntent({ message: "Пожалуйста, авторизуйтесь." });
    dispatch(logout());
  }
  return { type: EDIT_TASK_FAILURE };
}

export function editTask(id, text, status) {
  return (dispatch, getState) => {
    let usedStatus = status;
    let usedText = text;

    if (!status && status !== 0) {
      usedStatus = getState().tasks.tasks.find(x => x.id === id).status;
    }
    if (!text) {
      usedText = getState().tasks.tasks.find(x => x.id === id).text;
    }

    editTaskApi(getState().user.token, id, usedText, usedStatus)
      .then(result => {
        dispatch(editTaskSuccess(result, id, usedText, usedStatus));
      })
      .catch(errResult => {
        dispatch(editTaskFailure(dispatch, errResult));
      });
  };
}
