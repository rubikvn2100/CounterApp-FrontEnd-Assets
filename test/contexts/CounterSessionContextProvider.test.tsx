import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import {
  CounterSessionProvider,
  useCounterSession,
} from "../../src/contexts/CounterSessionContextProvider";
import { useConfig } from "../../src/contexts/ConfigContextProvider";
import {
  getApiCounter,
  postApiCounter,
  postApiSession,
} from "../../src/utils/apiHandler";

jest.mock("../../src/contexts/ConfigContextProvider", () => ({
  useConfig: jest.fn(),
}));

jest.mock("../../src/utils/apiHandler", () => ({
  getApiCounter: jest.fn(),
  postApiCounter: jest.fn(),
  postApiSession: jest.fn(),
}));

const TestConsumer = () => {
  const { counter, sessionStatus, addTimestamp, setReconnect } =
    useCounterSession();

  return (
    <div>
      <div>{counter}</div>
      <div>{sessionStatus}</div>
      <button onClick={addTimestamp} data-testid="add-timestamp">
        Add Timestamp
      </button>
      <button onClick={setReconnect} data-testid="set-reconnect">
        Reconnect
      </button>
    </div>
  );
};

describe("CounterSessionProvider", () => {
  const mockCounter = 5;
  const mockSessionDuration = 300;

  beforeEach(() => {
    (useConfig as jest.Mock).mockResolvedValue({
      apiUrl: "http://mock-api-url.com",
    });

    (getApiCounter as jest.Mock).mockResolvedValue({
      counter: mockCounter,
    });

    (postApiCounter as jest.Mock).mockImplementation(
      (_1, _2, timestamps: number[]) => {
        return Promise.resolve({
          counter: mockCounter + timestamps.length,
        });
      },
    );

    (postApiSession as jest.Mock).mockResolvedValue({
      token: "mockToken",
      sessionDuration: mockSessionDuration,
    });

    jest.useFakeTimers();
  });

  test("should transition through session states correctly and handle reconnect action", async () => {
    const { getByText, getByTestId } = render(
      <CounterSessionProvider>
        <TestConsumer />
      </CounterSessionProvider>,
    );

    const setReconnectButton = getByTestId("set-reconnect");

    expect(getByText("0")).toBeInTheDocument();
    expect(getByText("Connecting")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText(`${mockCounter}`)).toBeInTheDocument();
      expect(getByText("Live")).toBeInTheDocument();
    });

    act(() => jest.advanceTimersByTime(mockSessionDuration * 1000));

    await waitFor(() => {
      expect(getByText(`${mockCounter}`)).toBeInTheDocument();
      expect(getByText("Stopped")).toBeInTheDocument();
    });

    act(() => fireEvent.click(setReconnectButton));

    await waitFor(() => {
      expect(getByText(`${mockCounter}`)).toBeInTheDocument();
      expect(getByText("Connecting")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText(`${mockCounter}`)).toBeInTheDocument();
      expect(getByText("Live")).toBeInTheDocument();
    });
  });

  test("should update the counter correctly when adding timestamps", async () => {
    const { getByText, getByTestId } = render(
      <CounterSessionProvider>
        <TestConsumer />
      </CounterSessionProvider>,
    );

    const setAddTimestamps = getByTestId("add-timestamp");

    expect(getByText("0")).toBeInTheDocument();
    expect(getByText("Connecting")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText(`${mockCounter}`)).toBeInTheDocument();
      expect(getByText("Live")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(setAddTimestamps);
      fireEvent.click(setAddTimestamps);
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(getByText(`${mockCounter}`)).toBeInTheDocument();
      expect(getByText("Live")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText(`${mockCounter + 2}`)).toBeInTheDocument();
      expect(getByText("Live")).toBeInTheDocument();
    });
  });
});
