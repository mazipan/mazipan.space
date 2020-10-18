import { Global } from '@emotion/core';
import React, { FC, useEffect } from 'react';
import Helmet from 'react-helmet';

import GlobalStyles from './styles';
import { getJsonLdWebsite } from '../utils/jsonld';
import { trackTiming, trackJsErrors } from '../utils/ga';

interface IndexProps {
  className?: string;
}

const IndexLayout: FC<IndexProps> = (props) => {
  useEffect(() => {
    trackTiming();
    trackJsErrors();
  }, []);

  return (
    <div className={props.className}>
      <Helmet>
        <script type="application/ld+json" id="ld-website">{` ${getJsonLdWebsite()} `}</script>
        <link rel="webmention" href="https://webmention.io/mazipan.space/webmention" />
        <link rel="pingback" href="https://webmention.io/mazipan.space/xmlrpc" />
      </Helmet>
      <Global styles={GlobalStyles} />
      {props.children}
    </div>
  );
};

export default IndexLayout;
