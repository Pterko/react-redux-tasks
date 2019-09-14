import React from "react";
import { ButtonGroup, Button, Intent } from "@blueprintjs/core";
import styled from "styled-components";

const LEFT_RIGHT_ELEMENTS_COUNT = 2;

const TasksTablePagination = ({
  className,
  pagesCount,
  currentPage,
  onPageChange
}) => {
  const leftCounter = currentPage - LEFT_RIGHT_ELEMENTS_COUNT;

  const rightCounter = pagesCount - currentPage;

  const renderButtonIfPossible = (pageNumber, icon) => {
    // we will render icon button ALWAYS because they used for navigation
    if ((pageNumber > 0 && pageNumber <= pagesCount) || icon) {
      return (
        <Button
          key={pageNumber}
          intent={pageNumber === currentPage ? Intent.PRIMARY : Intent.NONE}
          onClick={() => onPageChange(pageNumber)}
          icon={icon}
          disabled={icon && (pageNumber > pagesCount || pageNumber <= 0)}
        >
          {icon ? "" : pageNumber}
        </Button>
      );
    }
    return null;
  };

  const generateCurrentPageAndNearButtons = pageNum => {
    const buttons = [];
    for (
      let i = pageNum - LEFT_RIGHT_ELEMENTS_COUNT;
      i <= pageNum + LEFT_RIGHT_ELEMENTS_COUNT;
      i += 1
    ) {
      buttons.push(renderButtonIfPossible(i));
    }
    return buttons;
  };

  return (
    <div className={className}>
      <ButtonGroup>
        {renderButtonIfPossible(currentPage - 1, "arrow-left")}

        {leftCounter > 1 && renderButtonIfPossible(1)}
        {leftCounter > 2 && <Button disabled>...</Button>}

        {generateCurrentPageAndNearButtons(currentPage)}

        {rightCounter >= 4 && <Button disabled>...</Button>}
        {rightCounter >= 3 && renderButtonIfPossible(pagesCount)}

        {renderButtonIfPossible(currentPage + 1, "arrow-right")}
      </ButtonGroup>
    </div>
  );
};

export default styled(TasksTablePagination)`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
