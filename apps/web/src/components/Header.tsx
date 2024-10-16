import React from "react";
import rocketEmoji from "public/emoji/Rocket.svg";
import Image from "next/image";

function Header() {
  return (
    <div className="relative h-[500px]">
      <div className="absolute flex justify-center items-center inset-0 h-[500px] w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:70px_70px] overflow-hidden">
        <div className="mb-10">
          <div>
            <h1 className="text-primary w-[600px] text-center font-geist_sans">
              Easily generate clean blogpost thumbnails in seconds
              <Image
                src={rocketEmoji}
                alt="rocket emoji"
                className="size-10 inline mx-5"
              />
            </h1>
          </div>
          <h6 className="text-center text-muted w-[600px] leading-relaxed">
            <span className="font-bold p-2 bg-blue-600 text-white rounded-xl">
              Focus
            </span>{" "}
            on writting and leave Blog thumbnials to us.Save time, skip the
            hassle, and let your posts shine. Keep writing—we’ve got the
            thumbnails covered!
          </h6>
        </div>
      </div>
      <div className="absolute inset-0 top-[200px] bg-gradient-to-b from-transparent via-transparent to-white h-[300px]"></div>
    </div>
  );
}

export default Header;
