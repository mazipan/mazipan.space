import { useEffect, useState } from 'react';

import { useInterval } from 'usehooks-ts';

import { randomizeBlobs } from '@/utils/blobs';
import { getRandomGradientStyle } from '@/utils/gradients';
import { cn } from '@/utils/styles';

import type { CSSProperties } from 'react';

export const GradientBlobs = ({
  className = '',
  style = {},
  swapGradient = false,
}: {
  className?: string;
  style?: CSSProperties;
  swapGradient?: boolean;
}) => {
  const [randomRadius, setRandomRadius] = useState<string>(randomizeBlobs());
  const [randomGradient, setRandomGradient] = useState<string>(getRandomGradientStyle());

  useInterval(() => {
    setRandomRadius(randomizeBlobs());
  }, 1100);

  useInterval(
    () => {
      setRandomGradient(getRandomGradientStyle());
    },
    swapGradient ? 1200 : null
  );

  useEffect(() => {
    // @ts-ignore
    const eventHandler = (e) => {
      if (e?.data === 'swap_gradient') {
        setRandomGradient(getRandomGradientStyle());
      }
    };

    window.addEventListener('message', eventHandler);

    return () => {
      window?.removeEventListener('message', eventHandler);
    };
  }, []);

  return (
    <div
      id="gradient-blob"
      className={cn('transition-all duration-1000 ease-linear', className)}
      style={{
        borderRadius: randomRadius,
        backgroundImage: randomGradient,
        ...style,
      }}
    ></div>
  );
};
