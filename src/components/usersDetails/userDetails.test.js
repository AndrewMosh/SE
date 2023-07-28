import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import UsersDetails from "./UsersDetails";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockUser = {
  login: "AndrewMosh",
  avatar_url: "https://example.com/avatar.jpg",
  followers_url: [],
  following_url: [],
  repos_url: [],
  site_admin: false,
  starred_url: [],
  subscriptions_url: [],
};

const mockStore = createStore(() => ({
  user: {
    selectedUser: mockUser,
  },
}));

test("renders user details correctly", () => {
  useSelector.mockImplementation((selectorFn) =>
    selectorFn(mockStore.getState())
  );

  render(
    <Provider store={mockStore}>
      <UsersDetails isOpen={true} onClose={() => {}} />
    </Provider>
  );

  expect(screen.getByAltText("avatar")).toBeInTheDocument();
  expect(screen.getByText("AndrewMosh")).toBeInTheDocument();
  expect(screen.getByText("Подписчиков: 0")).toBeInTheDocument();
  expect(screen.getByText("Подписок: 0")).toBeInTheDocument();
  expect(screen.getByText("Репозиториев: 0")).toBeInTheDocument();
  expect(screen.getByText("Звезд: 0")).toBeInTheDocument();
  expect(screen.getByText("Избранных: 0")).toBeInTheDocument();
  expect(screen.getByText("Закрыть")).toBeInTheDocument();
});
