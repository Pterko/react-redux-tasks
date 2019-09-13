import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@blueprintjs/core";

import { openLoginPopup, logout } from "../../../store/user";

const LoginButton = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (user.isLoggedIn) {
    return (
      <Button onClick={() => dispatch(logout())}>Выйти из аккаунта</Button>
    );
  }

  return <Button onClick={() => dispatch(openLoginPopup())}>Войти</Button>;
};

export default LoginButton;
