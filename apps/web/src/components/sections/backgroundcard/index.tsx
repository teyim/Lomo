import { Background } from '@repo/db'
import React from 'react'
import BackgroundCard from './Card'

type BackgroundCardsProps={
    backgrounds:Background[]
}
function BackgroundCards({backgrounds}:BackgroundCardsProps) {
  return (
    <div className='grid grid-cols-3 gap-4'>
    {backgrounds?.map((background)=>(
     <BackgroundCard imageUrl={background.imageUrl} name={background.name} recommendedColors={background.recommendedColors as any} key={background.id}/>
    ))}
    </div>
  )
}

export default BackgroundCards