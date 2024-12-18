import { baseUrl } from "@/constants";
import { Template } from "@/types";

// get all blogpost templates
export const getBlogPostTemplates = async () => {
  const response = await fetch(`${baseUrl}/api/templates/`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data = await response.json();
  return data;
};

// get single blogpost by id
export const getBlogPostById = async (id: string) => {
  const response = await fetch(`${baseUrl}/api/templates/${id}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data: Template = await response.json();
  return data;
};
