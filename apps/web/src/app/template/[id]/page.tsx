import { baseUrl } from "@/constants";
import React from "react";
import { Template } from "@prisma/client";
import { getBlogPostById } from "@/services";
import TemplateEditor from "@/components/TemplateEditor";

type TemplatePageProps = {
  params: { id: string };
};

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const templates: Template[] = await fetch(`${baseUrl}/api/templates/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return templates.map((template) => ({
    id: template.id,
  }));
}

async function Page({ params }: TemplatePageProps) {
  const templateData = await getBlogPostById(params.id);

  console.log(templateData);
  return (
    <div className="container p-4">
      <div>
        <p>
          <span className="font-bold">Template</span>: {templateData.name}
        </p>

        <div className="">
          <TemplateEditor templateData={templateData} />
        </div>
      </div>
    </div>
  );
}

export default Page;
