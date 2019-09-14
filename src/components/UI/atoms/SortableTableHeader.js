import React from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";

const SortableTableHeader = ({
  children,
  className,
  onClick,
  sortDirection,
  style
}) => {
  return (
    <th className={className} onClick={onClick} style={style}>
      {children}
      {sortDirection === "desc" && <Icon icon="caret-down" />}{" "}
      {sortDirection === "asc" && <Icon icon="caret-up" />}
    </th>
  );
};

export default styled(SortableTableHeader)`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;
