import { getStageConfig } from "../../../src/utils/apiHandler/stageConfig";

const mockedFetch = jest.fn();
global.fetch = mockedFetch as typeof global.fetch;

beforeEach(() => {
  mockedFetch.mockClear();
});

describe("getStageConfig", () => {
  test("returns preset API URL for localhost", async () => {
    Object.defineProperty(window, "location", {
      value: {
        hostname: "localhost",
        pathname: "/",
      },
      writable: true,
    });

    const config = await getStageConfig();
    expect(config.apiUrl).toBe("<your-test-api-url-here>");
  });

  test("handles non-200 response", async () => {
    Object.defineProperty(window, "location", {
      value: {
        hostname: "www.mock-hostname.com",
        pathname: "/mock-stage/",
      },
      writable: true,
    });

    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getStageConfig()).rejects.toThrow(
      `GET /mock-stage/config.json error! Status: 404`,
    );
  });

  test("returns json on success", async () => {
    Object.defineProperty(window, "location", {
      value: {
        hostname: "www.mock-hostname.com",
        pathname: "/mock-stage/",
      },
      writable: true,
    });
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ apiBaseUrl: "http://mock-api-url.com" }),
    });

    const config = await getStageConfig();
    expect(config.apiUrl).toBe("http://mock-api-url.com/mock-stage");
  });
});
