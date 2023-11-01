import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import CounterCard from "../../../../src/components/cards/CounterCard/CounterCard";

describe("CounterCard", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<CounterCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("increments counter on button click", () => {
    const { getByText } = render(<CounterCard />);
    const incrementButton = getByText(/Increment/i);
    const counterDisplay = getByText(/Counter: 0/i);

    fireEvent.click(incrementButton);

    expect(counterDisplay).toHaveTextContent("Counter: 1");
  });
});
