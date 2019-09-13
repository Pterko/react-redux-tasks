import React from "react";
import {
  Navbar as BlueprintNavbar,
  Alignment,
  Button
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";

import { AddTaskPopup, LoginPopup } from ".";
import { openAddTaskPopup, closeAddTaskPopup } from "../../../store/tasks";
import { closeLoginPopup } from "../../../store/user";
import { LoginButton } from "../atoms";

const Navbar = () => {
  const isAddTaskPopupOpen = useSelector(
    state => state.tasks.isAddTaskPopupOpen
  );

  const isLoginPopupOpen = useSelector(state => state.user.isLoginPopupOpen);

  const dispatch = useDispatch();

  return (
    <>
      <BlueprintNavbar>
        <BlueprintNavbar.Group align={Alignment.LEFT}>
          <BlueprintNavbar.Heading>Список задач</BlueprintNavbar.Heading>
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.RIGHT}>
          <Button onClick={() => dispatch(openAddTaskPopup())}>
            Добавить задачу
          </Button>
          <BlueprintNavbar.Divider />
          <LoginButton />
        </BlueprintNavbar.Group>
      </BlueprintNavbar>

      <AddTaskPopup
        isOpen={isAddTaskPopupOpen}
        onClose={() => dispatch(closeAddTaskPopup())}
      />

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => dispatch(closeLoginPopup())}
      />
    </>
  );
};

export default Navbar;
