import { baseUrl } from "@/constants";
import React from "react";
import { Template } from "@prisma/client";
import { getBlogPostById } from "@/services";
import TemplateEditor from "@/components/TemplateEditor";
import LayerPanel from "@/components/panels/LayerPanel";
import SettingsPanel from "@/components/panels/SettingsPanel";

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

  return (
    <div className="relative min-h-screen w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] p-4">
      <div className="relative z-0">
        <TemplateEditor templateData={templateData} />
      </div>
    </div>
  );
}

export default Page;
