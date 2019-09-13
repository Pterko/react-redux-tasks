import React from "react";
import { useDispatch } from "react-redux";

import { TasksTable } from ".";
import { loadTasks } from "../../store/tasks";

const TasksList = () => {
  const dispatch = useDispatch();

  // 1 is default page number
  dispatch(loadTasks(1));

  return (
    <div>
      <h2>Таблица задач</h2>
      <TasksTable />
    </div>
  );
};

export default TasksList;
