// tslint:disable:no-http-string
import React, { FC } from 'react';

const ChevronUp: FC<IconProps> = ({ height = '24', width = '24' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="17 11 12 6 7 11" />
    <polyline points="17 18 12 13 7 18" />
  </svg>
);

export default ChevronUp;
