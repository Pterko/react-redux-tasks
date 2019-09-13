import React from "react";

const convertStatusToText = statusCode => {
  switch (statusCode) {
    case 0:
      return "Не выполнена";
    case 10:
      return "Выполнена";
    default:
      return "Неизвестно";
  }
};

const Task = ({ task }) => {
  return (
    <tr>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>{task.text}</td>
      <td>{convertStatusToText(task.status)}</td>
    </tr>
  );
};

export default Task;
