import { Link } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Facebook from './icons/facebook';
import Twitter from './icons/twitter';
import Github from './icons/github';
import Linkedin from './icons/linkedin';

import pxToRem from '../styles/pxToRem';
import { outer, inner } from '../styles/shared';

import config from '../website-config';
import { trackClick, trackOutbond } from '../utils/ga';

const SiteFooter = css`
  position: relative;
  padding: 20px 0;
  color: var(--text-header);
  background: var(--bg-header);
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: ${pxToRem(12)};

  a {
    color: rgba(255, 255, 255, 0.7);
  }

  a:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const SiteFooterNav = styled.nav`
  display: flex;
  margin-top: 10px;

  a {
    position: relative;
    margin-left: 20px;
  }

  @media (max-width: 650px) {
    a:first-of-type {
      margin-left: 0;
    }
  }
`;

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-top: 10px;

  @media (min-width: 700px) {
    display: none;
  }

  a {
    padding: 0 10px;
  }
`;

const Footer: React.FC = () => {
  const trackFooterClick = (linkName: string) => {
    trackClick({
      eventCategory: 'Click Footer Link',
      eventLabel: `Footer - ${linkName}`,
    });
  };

  return (
    <footer css={[outer, SiteFooter]}>
      <div css={[inner, SiteFooterContent]}>
        <section className="copyright">
          &copy; {new Date().getFullYear()} {config.footer}
        </section>

        <SiteFooterNav>
          <Link
            to="/"
            onClick={() => {
              trackFooterClick('Latest posts');
            }}
          >
            Latest Posts
          </Link>
          <Link
            to="/archieves"
            onClick={() => {
              trackFooterClick('Archieves');
            }}
          >
            Archieves
          </Link>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener"
            onClick={() => {
              trackFooterClick('Rss');
            }}
          >
            RSS
          </a>
        </SiteFooterNav>

        <SocialLinks>
          {config.facebook && (
            <a
              href={config.facebook}
              target="_blank"
              title="Facebook"
              rel="noopener noreferrer"
              onClick={() => {
                trackOutbond(config.facebook ?? '', 'Sosial Media');
              }}
            >
              <Facebook height="48" width="1rem" />
            </a>
          )}

          {config.twitter && (
            <a
              href={config.twitter}
              title="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackOutbond(config.twitter ?? '', 'Sosial Media');
              }}
            >
              <Twitter height="48" width="1rem" />
            </a>
          )}

          {config.github && (
            <a
              href={config.github}
              title="Github"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackOutbond(config.github ?? '', 'Sosial Media');
              }}
            >
              <Github height="48" width="1rem" />
            </a>
          )}

          {config.linkedin && (
            <a
              href={config.linkedin}
              title="Linkedin"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackOutbond(config.linkedin ?? '', 'Sosial Media');
              }}
            >
              <Linkedin height="48" width="1rem" />
            </a>
          )}
        </SocialLinks>
      </div>
    </footer>
  );
};

export default Footer;
