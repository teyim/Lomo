'use client';

import { useDynamicNavigation } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { DynamicRoutes } from '@/types';
import { PenToolIcon } from 'lucide-react';
type CardProps = {
  title: string;
  imageUrl: string;
  id: string;
};
function Card({ title, imageUrl, id }: CardProps) {
  const { navigateToRoute } = useDynamicNavigation();

  const handleClick = () => {
    navigateToRoute({
      slug: `${id}`,
      dynamicRouteName: DynamicRoutes.Template,
    });
  };

  return (
    <div className="rounded-xl p-3 bg-white ring-1 ring-slate-500 ">
      <div>
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={400}
          className="rounded-xl"
          priority
        />
      </div>
      <div>
        <p className="mt-3 font-geist_mono font-bold">{title}</p>
      </div>
      <div>
        <Button
          onClick={handleClick}
          className="rounded-xl flex space-x-2 items-center"
        >
          <span>Edit</span>
          <span>
            <PenToolIcon size={15} />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Card;
