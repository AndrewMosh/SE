import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

Object.defineProperty(window, "scrollTo", { value: jest.fn() });
test("renders Pagination component correctly", () => {
  const totalPages = 5;
  const currentPage = 3;
  const onPageChange = jest.fn();

  render(
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(totalPages);

  buttons.forEach((button, index) => {
    expect(button).toHaveTextContent((index + 1).toString());
  });

  const currentPageButton = screen.getByText(currentPage.toString());
  expect(currentPageButton).toHaveClass("current");
  expect(currentPageButton).toHaveClass("page");

  buttons
    .filter((button) => button !== currentPageButton)
    .forEach((inactiveButton) => {
      expect(inactiveButton).toHaveClass("inactive");
      expect(inactiveButton).toHaveClass("page");
    });
});

test("calls onPageChange with the correct page number", () => {
  const totalPages = 5;
  const currentPage = 3;
  const onPageChange = jest.fn();

  render(
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );

  const firstPageButton = screen.getByText("1");
  fireEvent.click(firstPageButton);
  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(1);

  const lastPageButton = screen.getByText(totalPages.toString());
  fireEvent.click(lastPageButton);
  expect(onPageChange).toHaveBeenCalledTimes(2);
  expect(onPageChange).toHaveBeenCalledWith(totalPages);

  const randomPageButton = screen.getByText("2");
  fireEvent.click(randomPageButton);
  expect(onPageChange).toHaveBeenCalledTimes(3);
  expect(onPageChange).toHaveBeenCalledWith(2);
});
