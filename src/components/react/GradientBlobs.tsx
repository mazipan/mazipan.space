import { useState } from 'react';

import { useInterval } from 'usehooks-ts';

import { randomizeBlobs } from '@/utils/blobs';
import { cn } from '@/utils/styles';

import type { CSSProperties } from 'react';

export const GradientBlobs = ({
  className = '',
  style = {},
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const [randomRadius, setRandomRadius] = useState<string>(randomizeBlobs());

  useInterval(() => {
    setRandomRadius(randomizeBlobs());
  }, 500);

  return (
    <div
      className={cn('transition-all duration-700 ease-linear', className)}
      style={{
        borderRadius: randomRadius,
        ...style,
      }}
    ></div>
  );
};
