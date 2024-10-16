import Image from "next/image";
import React from "react";
type CardProps = {
  title: string;
  imageUrl: string;
};
function Card({ title, imageUrl }: CardProps) {
  return (
    <div className="rounded-xl p-3 bg-white ring-1 ring-slate-500 hover:ring-blue-700 hover:ring-2 hover:cursor-pointer hover:shadow-md hover:shadown-blue-400">
      <div>
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={400}
          className="rounded-xl"
        />
      </div>
      <div>
        <h6 className="mt-3 font-geist_mono font-bold">{title}</h6>
      </div>
    </div>
  );
}

export default Card;
