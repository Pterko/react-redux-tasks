import React from "react";
import { useSelector } from "react-redux";
import { EditableText } from "@blueprintjs/core";

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
  const user = useSelector(state => state.user);

  const renderText = () => {
    if (!user.isLoggedIn) {
      return task.text;
    }
    return (
      <EditableText
        placeholder="Edit report... (controlled, multiline)"
        value={task.text}
        multiline
      />
    );
  };

  return (
    <tr>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>{renderText()}</td>
      <td>{convertStatusToText(task.status)}</td>
    </tr>
  );
};

export default Task;
