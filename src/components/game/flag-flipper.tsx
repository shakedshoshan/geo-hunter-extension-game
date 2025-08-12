
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Country, countries } from '@/lib/data';
import { cn } from '@/lib/utils';

interface FlagFlipperProps {
  country: Country | null;
  startAnimation: boolean;
}

const FLIP_INTERVAL = 100;
const ANIMATION_DURATION = 1500;

export const FlagFlipper: React.FC<FlagFlipperProps> = ({ country, startAnimation }) => {
  const [displayFlag, setDisplayFlag] = useState(country?.flag || 'https://placehold.co/320x213.png');
  const [isFlipping, setIsFlipping] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (startAnimation && country) {
      setIsFlipping(true);
      setKey(prev => prev + 1); // Reset animation state

      const totalFlips = Math.floor(ANIMATION_DURATION / FLIP_INTERVAL);
      let flipCount = 0;

      const intervalId = setInterval(() => {
        if (flipCount >= totalFlips) {
          clearInterval(intervalId);
          setDisplayFlag(country.flag);
          setIsFlipping(false);
        } else {
          const randomCountry = countries[Math.floor(Math.random() * countries.length)];
          setDisplayFlag(randomCountry.flag);
          flipCount++;
        }
      }, FLIP_INTERVAL);

      return () => clearInterval(intervalId);
    } else if (country) {
      setDisplayFlag(country.flag);
    }
  }, [startAnimation, country]);

  return (
    <div className="relative w-full h-full overflow-hidden">
        <Image
            key={key}
            src={displayFlag}
            alt="Country Flag"
            className={cn(isFlipping && 'animate-flag-flip')}
            fill
            style={{ objectFit: 'cover' }}
            priority
            unoptimized
        />
    </div>
  );
};
