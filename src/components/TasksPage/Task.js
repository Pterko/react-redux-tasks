import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditableText, Checkbox } from "@blueprintjs/core";

import { editTask } from "../../store/tasks";

const convertStatusToText = statusCode => {
  switch (statusCode) {
    case 0:
      return "Не выполнено";
    case 10:
      return "Выполнено, отредактировано администратором";
    default:
      return "Неизвестно";
  }
};

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const [text, setText] = useState(task.text);

  const renderText = () => {
    if (!user.isLoggedIn) {
      return task.text;
    }
    return (
      <EditableText
        placeholder="Edit report... (controlled, multiline)"
        value={text}
        multiline
        onChange={setText}
        onConfirm={() => dispatch(editTask(task.id, text))}
      />
    );
  };

  const handleCheckboxChange = e => {
    const newStatus = e.target.checked ? 10 : 0;
    dispatch(editTask(task.id, undefined, newStatus));
  };

  const renderCheckboxIfNeeded = () => {
    if (user.isLoggedIn) {
      return (
        <Checkbox
          checked={task.status === 10}
          onChange={handleCheckboxChange}
        />
      );
    }
    return null;
  };

  return (
    <tr>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>{renderText()}</td>
      <td>
        {renderCheckboxIfNeeded()}
        {convertStatusToText(task.status)}
      </td>
    </tr>
  );
};

export default Task;
