/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { Dialog, Classes, Button, Intent } from "@blueprintjs/core";
import styled from "styled-components";

import { SuccessToaster, ErrorToaster } from "../atoms";
import { ValidatedFormInputGroup } from "../molecules";

import validateEmail from "../../../utils/validateEmail";

import { addTask } from "../../../api";

const AddTaskPopup = ({ className, isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const [text, setText] = useState("");
  const [isTextValid, setIsTextValid] = useState(true);

  const sendForm = async () => {
    try {
      if (username.length === 0) {
        return setIsUsernameValid(false);
      }
      setIsUsernameValid(true);

      if (!validateEmail(email)) {
        return setIsEmailValid(false);
      }
      setIsEmailValid(true);

      if (text.length === 0) {
        return setIsTextValid(false);
      }
      setIsTextValid(true);

      await addTask(username, email, text);

      SuccessToaster.show({
        message: "Задача успешно добавлена",
        intent: Intent.SUCCESS,
        timeout: 2000
      });

      return onClose();
    } catch (ex) {
      ErrorToaster.show({
        message: "Возникла непредвиденная ошибка",
        intent: Intent.DANGER,
        timeout: 2000
      });
    }
  };

  return (
    <>
      <Dialog
        className={className}
        isOpen={isOpen}
        onClose={onClose}
        icon="add"
        title="Добавление новой задачи"
      >
        <div className={Classes.DIALOG_BODY}>
          <ValidatedFormInputGroup
            label="Имя пользователя"
            id="username"
            placeholder="SuperUser"
            labelInfo="(обязательно)"
            value={username}
            onChange={e => setUsername(e.target.value)}
            isValid={isUsernameValid}
            invalidMessage="Пожалуйста, введите имя пользователя"
          />

          <ValidatedFormInputGroup
            label="E-mail"
            id="e-mail"
            placeholder="john@acme.org"
            labelInfo="(обязательно)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            isValid={isEmailValid}
            invalidMessage="Пожалуйста, введите правильный e-mail"
          />

          <ValidatedFormInputGroup
            label="Текст задачи"
            id="text-input"
            placeholder="john@acme.org"
            labelInfo="(обязательно)"
            value={text}
            onChange={e => setText(e.target.value)}
            isValid={isTextValid}
            invalidMessage="Пожалуйста, введите текст задачи"
            isTextArea
          />
          <Button fill className="add-button" onClick={sendForm}>
            Добавить задачу
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default styled(AddTaskPopup)``;
