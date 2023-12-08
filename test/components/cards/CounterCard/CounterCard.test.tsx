import React from "react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { CounterCardContent } from "../../../../src/components/cards/CounterCard/CounterCard";
import { useCounterSession } from "../../../../src/contexts/CounterSessionContextProvider";

jest.mock("../../../../src/contexts/CounterSessionContextProvider", () => ({
  useCounterSession: jest.fn(),
}));

const mockUseCounterSession = useCounterSession as jest.Mock;

const renderWithMockedContext = (sessionStatus: string) => {
  mockUseCounterSession.mockImplementation(() => ({
    counter: 5,
    sessionStatus,
    addTimestamp: jest.fn(),
    reconnect: jest.fn(),
  }));

  return renderer.create(<CounterCardContent />).toJSON();
};

describe("CounterCardContent", () => {
  test.each([["Connecting"], ["Live"], ["Stopped"], ["InvalidStatus"]])(
    "matches snapshot with sessionStatus: %s",
    (status) => {
      const tree = renderWithMockedContext(status);
      expect(tree).toMatchSnapshot();
    },
  );
});
