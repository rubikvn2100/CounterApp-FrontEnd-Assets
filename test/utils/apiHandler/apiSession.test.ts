import { postApiSession } from "../../../src/utils/apiHandler";

const mockedFetch = jest.fn();
global.fetch = mockedFetch as typeof global.fetch;

beforeEach(() => {
  mockedFetch.mockClear();
});

describe("postApiSession", () => {
  const mockApiUrl = "http://mock-api-url.com";

  test("throws error when API URL is not set", async () => {
    await expect(postApiSession("")).rejects.toThrow("API URL is not set.");
  });

  test("handles non-200 response", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(postApiSession(mockApiUrl)).rejects.toThrow(
      "POST /api/session error! Status: 404",
    );
  });

  test("returns json on success", async () => {
    const mockResponse = { testKey: "testValue" };
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await postApiSession(mockApiUrl);
    expect(response).toEqual(mockResponse);
  });
});
