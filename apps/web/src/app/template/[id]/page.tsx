import { baseUrl } from "@/constants";
import React from "react";
import { Template } from "@prisma/client";
import { getBlogPostById } from "@/services";
import TemplateEditor from "@/components/TemplateEditor";
import Image from "next/image";
import abstractArt from "public/illustrations/abstract-art-6.svg";

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
      <div className="w-full flex flex-col items-center justify-center content-center md:hidden  h-screen text-center">
        <div>
          <Image
            src={abstractArt}
            alt="Mobile Not Supported"
            width={200}
            height={200}
          />
        </div>
        <h2 className="text-2xl font-semibold">
          Not available on mobile devices
        </h2>
      </div>
      <div className="hidden md:block relative z-0">
        <TemplateEditor templateData={templateData} />
      </div>
    </div>
  );
}

export default Page;
