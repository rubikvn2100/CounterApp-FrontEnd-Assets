export const getApiCounter = async (apiUrl: string, token: string) => {
  if (!apiUrl) {
    throw new Error("API URL is not set.");
  }

  const response = await fetch(`${apiUrl}/api/counter`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`GET /api/counter error! Status: ${response.status}`);
  }

  return await response.json();
};

export const postApiCounter = async (
  apiUrl: string,
  token: string,
  timestamps: number[],
) => {
  if (!apiUrl) {
    throw new Error("API URL is not set.");
  }

  const response = await fetch(`${apiUrl}/api/counter`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      timestamps: timestamps,
    }),
  });

  if (!response.ok) {
    throw new Error(`POST /api/counter error! Status: ${response.status}`);
  }

  return await response.json();
};
