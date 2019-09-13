import React from "react";
import styled from "styled-components";

import { Navbar } from "../UI/organisms";
import { TasksList } from ".";

const TasksPage = ({ className }) => {
  return (
    <div className={className}>
      <Navbar />
      <TasksList />
    </div>
  );
};

export default styled(TasksPage)`
  max-width: 900px;

  margin: 20px auto;
`;
