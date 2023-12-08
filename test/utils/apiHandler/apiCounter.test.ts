import { getApiCounter, postApiCounter } from "../../../src/utils/apiHandler";

const mockedFetch = jest.fn();
global.fetch = mockedFetch as typeof global.fetch;

beforeEach(() => {
  mockedFetch.mockClear();
});

describe("getApiCounter", () => {
  const mockApiUrl = "http://mock-api-url.com";
  const mockToken = "mock-token";

  test("throws error when API URL is not set", async () => {
    await expect(getApiCounter("", mockToken)).rejects.toThrow(
      "API URL is not set.",
    );
  });

  test("handles non-200 response", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getApiCounter(mockApiUrl, mockToken)).rejects.toThrow(
      "GET /api/counter error! Status: 404",
    );
  });

  test("returns json on success", async () => {
    const mockResponse = { count: 5 };
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await getApiCounter(mockApiUrl, mockToken);
    expect(response).toEqual(mockResponse);
  });
});

describe("postApiCounter", () => {
  const mockApiUrl = "http://mock-api-url.com";
  const mockToken = "mock-token";
  const mockTimestamps = [1234567890, 1234567891];

  test("throws error when API URL is not set", async () => {
    await expect(postApiCounter("", mockToken, mockTimestamps)).rejects.toThrow(
      "API URL is not set.",
    );
  });

  test("handles non-200 response", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(
      postApiCounter(mockApiUrl, mockToken, mockTimestamps),
    ).rejects.toThrow("POST /api/counter error! Status: 404");
  });

  test("returns json on success", async () => {
    const mockResponse = { success: true };
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await postApiCounter(
      mockApiUrl,
      mockToken,
      mockTimestamps,
    );
    expect(response).toEqual(mockResponse);
  });
});
