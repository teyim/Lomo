import Header from "@/components/Header";
import ThumbnailsSection from "@/components/sections/thumbnails";
import React from "react";

function page() {
  return (
    <section>
      <Header />
      <div className="bg-[#F5F7FA]">
        <ThumbnailsSection />
      </div>
    </section>
  );
}

export default page;
