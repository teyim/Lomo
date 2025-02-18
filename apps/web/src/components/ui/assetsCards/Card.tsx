'use client';

import React from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { useBlogThumbnailStore } from '@/store';
import { useShallow } from 'zustand/shallow';

interface AssetsCardProps {
  name: string;
  imageUrl: string;
}

function AssetsCard({ name, imageUrl }: AssetsCardProps) {
  const { hideModal } = useModal();
  const { addSelectedImageAsset } = useBlogThumbnailStore(
    useShallow(state => ({ addSelectedImageAsset: state.addSelectedImageAsset }))
  );

  const handleSelect = () => {
    console.log(imageUrl);
    addSelectedImageAsset(imageUrl);
    hideModal();
  };

  return (
    <div>
      <button
        className=" shadow-sm rounded-2xl  hover:ring-1 hover:ring-slate-600 hover:shadow-lg flex justify-center cursor-pointer"
        onClick={handleSelect}
      >
        <Image
          src={imageUrl}
          alt={`asset-${name}`}
          width={90}
          height={90}
          className="rounded-2xl h-full w-full"
        />
      </button>
      <div className="mt-2">
        <p className="font-semibold text-xs">{name}</p>
      </div>
    </div>
  );
}

export default AssetsCard;
