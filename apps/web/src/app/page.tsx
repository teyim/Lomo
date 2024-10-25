import Header from "@/components/Header";
import TemplatesSection from "@/components/sections/templates";
import { getBlogPostTemplates } from "@/services";
import React from "react";

async function page() {
  const data = await getBlogPostTemplates();
  return (
    <section>
      <Header />
      <div className="bg-[#F5F7FA]">
        <TemplatesSection templates={data} />
      </div>
    </section>
  );
}

export default page;
