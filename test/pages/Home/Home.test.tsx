import React from "react";
import renderer from "react-test-renderer";
import Home from "../../../src/pages/Home/Home";

describe("Home component", () => {
  test("matches the snapshot", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
