export const postApiSession = async (apiUrl: string) => {
  if (!apiUrl) {
    throw new Error("API URL is not set.");
  }

  const response = await fetch(`${apiUrl}/api/session`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`POST /api/session error! Status: ${response.status}`);
  }

  return await response.json();
};
