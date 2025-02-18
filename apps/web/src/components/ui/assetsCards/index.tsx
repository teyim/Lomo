'use client';

import { Asset } from '@repo/db';
import React from 'react';
import AssetsCard from './Card';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { getAssetsByCategory } from '@/services';
import { Skeleton } from '../skeleton';

type AssetCardProps = { categoryId: string };
function AssetsCards({ categoryId }: AssetCardProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEYS.Assets_By_Category],
    queryFn: () => getAssetsByCategory(categoryId),
  });
  console.log(data?.assets[0].imgUrl);
  const renderCurrentComponentState = () => {
    if (isPending) {
      return (
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[150px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[150px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[150px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
      );
    }
    if (isError) {
      return (
        <div>
          <h2>Error</h2>
          <p>Error occured while fetching data. Please try again</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-4">
        {data.assets?.map(asset => (
          <AssetsCard
            imageUrl={asset.imgUrl}
            name={asset.name}
            key={asset.id}
          />
        ))}
      </div>
    );
  };

  return renderCurrentComponentState();
}

export default AssetsCards;
