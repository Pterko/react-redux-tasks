import React, { useState } from "react";
import { Dialog, Classes, Button } from "@blueprintjs/core";
import { ValidatedFormInputGroup } from "../molecules";
import { useDispatch } from "react-redux";

import { login } from "../../../store/user";

const LoginPopup = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLoginButton = e => {
    e.preventDefault();

    dispatch(login(username, password));
  };

  return (
    <Dialog icon="log-in" title="Авторизация" isOpen={isOpen} onClose={onClose}>
      <div className={Classes.DIALOG_BODY}>
        <form onSubmit={handleLoginButton}>
          <ValidatedFormInputGroup
            label="Имя пользователя"
            id="username"
            placeholder="SuperUser"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <ValidatedFormInputGroup
            label="Пароль"
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button fill className="add-button" type="submit">
            Авторизоваться
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default LoginPopup;
