import Header from "@/components/Header";
import ThumbnailsSection from "@/components/sections/thumbnails";
import { getBlogPostTemplates } from "@/services";
import React from "react";

async function page() {
  const data = await getBlogPostTemplates();
  return (
    <section>
      <Header />
      <div className="bg-[#F5F7FA]">
        <ThumbnailsSection thumbnials={data} />
      </div>
    </section>
  );
}

export default page;
