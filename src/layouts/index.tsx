import { Global } from '@emotion/core';
import React, { FC, useEffect } from 'react';
import Helmet from 'react-helmet';

import GlobalStyles from './styles';
import { getJsonLdWebsite, getJsonLdOrganization } from '../utils/jsonld';
import { trackTiming } from '../utils/ga';

interface IndexProps {
  className?: string;
}

const IndexLayout: FC<IndexProps> = (props) => {
  useEffect(() => {
    trackTiming();
  }, []);

  return (
    <div className={props.className}>
      <Helmet>
        <script type="application/ld+json" id="ld-website">{` ${getJsonLdWebsite()} `}</script>
        <script type="application/ld+json" id="ld-org">{` ${getJsonLdOrganization()} `}</script>
      </Helmet>
      <Global styles={GlobalStyles} />
      {props.children}
    </div>
  );
};

export default IndexLayout;
