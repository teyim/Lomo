// get all blogpost templates
export const getBlogPostTemplates = async () => {
  const response = await fetch(
    "https://api.github.com/repos/lomo-team/lomo-blogpost-templates/contents",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};
