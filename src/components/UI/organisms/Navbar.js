import React from "react";
import {
  Navbar as BlueprintNavbar,
  Alignment,
  Button
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";

import { AddTaskPopup } from ".";
import { openAddTaskPopup, closeAddTaskPopup } from "../../../store/tasks";

const Navbar = () => {
  const isAddTaskPopupOpen = useSelector(
    state => state.tasks.isAddTaskPopupOpen
  );

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
          <Button>Войти</Button>
        </BlueprintNavbar.Group>
      </BlueprintNavbar>

      <AddTaskPopup
        isOpen={isAddTaskPopupOpen}
        onClose={() => dispatch(closeAddTaskPopup())}
      />
    </>
  );
};

export default Navbar;
