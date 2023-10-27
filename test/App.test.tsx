import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../src/App";

describe("App component", () => {
  test("renders Hello World text", () => {
    render(<App />);
    expect(screen.getByText("Hello World")).toBeDefined();
  });

  test("matches the snapshot", () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
