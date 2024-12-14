import { useState } from 'react';

import { useInterval } from 'usehooks-ts';

import { randomizeBlobs } from '@/utils/blobs';
import { cn } from '@/utils/styles';

export const GradientBlobs = ({ className = '' }) => {
  const [randomRadius, setRandomRadius] = useState<string>(randomizeBlobs());

  useInterval(() => {
    setRandomRadius(randomizeBlobs());
  }, 500);

  return (
    <div
      className={cn('transition-all duration-700 ease-linear', className)}
      style={{
        borderRadius: randomRadius,
      }}
    ></div>
  );
};
