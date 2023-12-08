import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import {
  ConfigProvider,
  useConfig,
} from "../../src/contexts/ConfigContextProvider";
import { getStageConfig } from "../../src/utils/apiHandler";

jest.mock("../../src/utils/apiHandler", () => ({
  getStageConfig: jest.fn(),
}));

const TestConsumer = () => {
  const { apiUrl } = useConfig();
  return <div>{apiUrl}</div>;
};

describe("ConfigProvider", () => {
  test("logs an error when fetching config fails", async () => {
    const mockError = new Error("Mock Error");
    (getStageConfig as jest.Mock).mockRejectedValue(mockError);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ConfigProvider>
        <TestConsumer />
      </ConfigProvider>,
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Failed to fetch config: ${mockError}`,
      );
    });
  });

  test("provides the correct config", () => {
    (getStageConfig as jest.Mock).mockResolvedValue({
      apiUrl: "http://mock-api-url.com",
    });

    const { getByText } = render(
      <ConfigProvider>
        <TestConsumer />
      </ConfigProvider>,
    );

    waitFor(() => {
      expect(getByText("http://mock-api-url.com")).toBeInTheDocument();
    });
  });
});
