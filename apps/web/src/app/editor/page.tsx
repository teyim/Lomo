import React from "react";
import { getAllBackgrounds, getAllLayouts } from "@/services";
import TemplateEditor from "@/components/TemplateEditor";
import Image from "next/image";
import abstractArt from "public/illustrations/abstract-art-6.svg";

async function Page() {
  const backgroundData = await getAllBackgrounds();
  const layoutData = await getAllLayouts();

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
        <TemplateEditor
          backgroundData={backgroundData.backgrounds}
          layoutData={layoutData.layouts}
        />
      </div>
    </div>
  );
}

export default Page;
