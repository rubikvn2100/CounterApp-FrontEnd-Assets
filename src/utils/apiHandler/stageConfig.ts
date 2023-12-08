const presetApiUrl = "<your-test-api-url-here>";

export const getStageConfig = async () => {
  if (window.location.hostname === "localhost") {
    console.log("Use preset ApiUrl.");

    return { apiUrl: presetApiUrl };
  }

  const pathSegments = window.location.pathname.split("/");
  const stage = pathSegments[1];

  const response = await fetch(`/${stage}/config.json`);
  if (!response.ok) {
    throw new Error(
      `GET /${stage}/config.json error! Status: ${response.status}`,
    );
  }

  const config = await response.json();

  return { apiUrl: `${config.apiBaseUrl}/${stage}` };
};
