import React from "react";
import renderer from "react-test-renderer";
import App from "../src/App";

describe("App component", () => {
  test("matches the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
