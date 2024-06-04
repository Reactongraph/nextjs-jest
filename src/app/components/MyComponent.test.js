import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import MyComponent, { MY_QUERY } from "./MyComponent";

const mocks = [
  {
    request: {
      query: MY_QUERY,
    },
    result: {
      data: {
        myData: { id: 1, name: "Test" },
      },
    },
  },
];

test("renders MyComponent with data", async () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MyComponent />
    </MockedProvider>
  );

  expect(getByText("Loading...")).toBeInTheDocument();
  await waitFor(() => {
    expect(getByText("ID: 1")).toBeInTheDocument();
    expect(getByText("Name: Test")).toBeInTheDocument();
  });
});
