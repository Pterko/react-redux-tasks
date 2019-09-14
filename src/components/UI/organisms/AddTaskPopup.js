/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { Dialog, Classes, Button, Intent } from "@blueprintjs/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { SuccessToaster, ErrorToaster } from "../atoms";
import { ValidatedFormInputGroup } from "../molecules";

import { loadTasks } from "../../../store/tasks";

import { addTask } from "../../../api";

const AddTaskPopup = ({ className, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");

  const [text, setText] = useState("");

  const sendForm = async e => {
    e.preventDefault();
    try {
      await addTask(username, email, text);

      SuccessToaster.show({
        message: "Задача успешно добавлена",
        intent: Intent.SUCCESS,
        timeout: 2000
      });

      dispatch(loadTasks());

      return onClose();
    } catch (ex) {
      ErrorToaster.show({
        message: "Возникла непредвиденная ошибка",
        intent: Intent.DANGER,
        timeout: 2000
      });
    }
    return null;
  };

  const cleanForm = () => {
    setUsername("");
    setEmail("");
    setText("");
    return null;
  };

  return (
    <>
      <Dialog
        className={className}
        isOpen={isOpen}
        onOpening={cleanForm}
        onClose={onClose}
        icon="add"
        title="Добавление новой задачи"
      >
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={sendForm}>
            <ValidatedFormInputGroup
              label="Имя пользователя"
              id="username"
              placeholder="SuperUser"
              labelInfo="(обязательно)"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />

            <ValidatedFormInputGroup
              label="E-mail"
              id="e-mail"
              placeholder="john@acme.org"
              labelInfo="(обязательно)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              type="email"
            />

            <ValidatedFormInputGroup
              label="Текст задачи"
              id="text-input"
              placeholder="john@acme.org"
              labelInfo="(обязательно)"
              value={text}
              onChange={e => setText(e.target.value)}
              isTextArea
              required
            />
            <Button fill className="add-button" type="submit">
              Добавить задачу
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default styled(AddTaskPopup)``;
