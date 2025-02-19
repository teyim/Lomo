'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import img1 from 'public/images/thumbnails/Frame6.jpg';
import img2 from 'public/images/thumbnails/Frame 8.jpg';
import img3 from 'public/images/thumbnails/Frame 9.jpg';
import img4 from 'public/images/thumbnails/Frame 10.jpg';
import img5 from 'public/images/thumbnails/Frame 11.jpg';
import img6 from 'public/images/thumbnails/Frame 12.jpg';
import img7 from 'public/images/thumbnails/Frame 13.jpg';
import img8 from 'public/images/thumbnails/Frame 15.jpg';
import Image from 'next/image';

const gradients = [
  'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300',
  'bg-gradient-to-r from-green-200 to-blue-300',
  'bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300',
  'bg-gradient-to-r from-blue-200 via-teal-300 to-green-200',
  'bg-gradient-to-r from-purple-200 via-pink-300 to-red-200',
  'bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300',
  'bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-300',
  'bg-gradient-to-r from-rose-200 via-fuchsia-300 to-indigo-300',
];

const cards = [
  {
    name: 'frame1',
    image: img1,
  },
  {
    name: 'frame2',
    image: img2,
  },
  {
    name: 'frame3',
    image: img3,
  },
  {
    name: 'frame4',
    image: img4,
  },
  {
    name: 'frame5',
    image: img5,
  },
  {
    name: 'frame6',
    image: img6,
  },
  {
    name: 'frame7',
    image: img7,
  },
  {
    name: 'frame8',
    image: img8,
  },
].map((card, index) => ({
  ...card,
  gradient: gradients[index % gradients.length],
}));

export default function StackedCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] w-full max-w-md mx-auto">
      <div className="absolute left-1/2 -translate-x-1/2 w-[140%]">
        {cards.map((card, index) => {
          const position = (index - activeIndex + cards.length) % cards.length;
          const offset = position === 0 ? 0 : position === 1 ? -15 : 15;

          // Calculate scale based on position
          const isActive = position === 0;
          const scale = isActive ? 1 : 0.9;

          return (
            <div
              key={index}
              className={`absolute  left-0 right-0 transition-all duration-500 ease-out rounded-2xl 
                ${isActive ? 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]' : ''}`}
              style={{
                transform: `translateX(${offset}%) scale(${scale})`,
                zIndex: position === 0 ? 30 : position === 1 ? 20 : 10,
                opacity: 1,
                width: '100%',
                transformOrigin: 'center center',
              }}
            >
              <div
                className={`${card.gradient}  rounded-2xl transition-all duration-500 
                  backdrop-blur-sm p-2 overflow-hidden group`}
              >
                <div className="h-[250px] w-full relative p-2">
                  <Image
                    src={card.image}
                    alt={card.name}
                    className="object-cover h-full w-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
