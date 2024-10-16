import { baseUrl } from "@/constants";

// get all blogpost templates
export const getBlogPostTemplates = async () => {
  const response = await fetch(`${baseUrl}/api/templates/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data = await response.json();
  return data;
};
