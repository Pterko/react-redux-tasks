import React from "react";
import { HTMLTable, Spinner } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { Task, TasksTablePagination } from ".";
import { loadTasks, changeSort } from "../../store/tasks";
import { SortableTableHeader } from "../UI/atoms";

const TasksTable = ({ className }) => {
  const dispatch = useDispatch();

  const tasks = useSelector(state => state.tasks);
  const user = useSelector(state => state.user);
  const pagesCount = Math.ceil(tasks.tasksCount / 3);

  const { isTasksLoading } = tasks;

  const handlePageChange = pageNumber => {
    dispatch(loadTasks(pageNumber));
  };

  const handleHeaderClick = headerKey => {
    return () => {
      if (tasks.sortField === headerKey) {
        dispatch(
          changeSort(headerKey, tasks.sortDirection === "asc" ? "desc" : "asc")
        );
      } else {
        dispatch(changeSort(headerKey, "desc"));
      }
    };
  };

  const getSortDirection = headerKey => {
    return tasks.sortField === headerKey ? tasks.sortDirection : null;
  };

  return (
    <>
      {isTasksLoading && <Spinner />}
      {!isTasksLoading && (
        <>
          <HTMLTable className={className}>
            <thead>
              <tr>
                <SortableTableHeader
                  onClick={handleHeaderClick("username")}
                  sortDirection={getSortDirection("username")}
                  style={{ width: "15%" }}
                >
                  Имя пользователя
                </SortableTableHeader>
                <SortableTableHeader
                  onClick={handleHeaderClick("email")}
                  sortDirection={getSortDirection("email")}
                  style={{ width: "15%" }}
                >
                  E-mail
                </SortableTableHeader>
                <th style={{ width: "50%" }}>Текст задачи</th>
                <SortableTableHeader
                  onClick={handleHeaderClick("status")}
                  sortDirection={getSortDirection("status")}
                  style={{ width: "20%" }}
                >
                  Статус
                </SortableTableHeader>
              </tr>
            </thead>
            <tbody>
              {tasks.tasks.map(task => (
                <Task key={task.id} task={task} />
              ))}
            </tbody>
          </HTMLTable>
          <TasksTablePagination
            pagesCount={pagesCount}
            currentPage={tasks.page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default styled(TasksTable)`
  width: 100%;
`;
