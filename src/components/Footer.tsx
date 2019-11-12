import { Link } from 'gatsby';
import { setLightness } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../styles/colors';
import { outer, inner } from '../styles/shared';

import config from '../website-config';
import Facebook from './icons/facebook';
import Twitter from './icons/twitter';
import Github from './icons/github';
import Linkedin from './icons/linkedin';

const SiteFooter = css`
  position: relative;
  padding-top: 20px;
  padding-bottom: 60px;
  color: #fff;
  background: ${setLightness('0.0015', colors.darkgrey)};
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
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

  a {
    position: relative;
    margin-left: 20px;
  }

  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
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

  @media (min-width: 700px) {
    display: none;
  }

  a {
    padding: 0 10px;
  }

  svg {
    fill: rgba(255, 255, 255, 0.7);

    &:hover {
      fill: rgba(255, 255, 255, 1);
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <footer css={[outer, SiteFooter]}>
      <div css={[inner, SiteFooterContent]}>
        <section className="copyright">
          <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}{' '}
          { config.footer }
        </section>

        <SiteFooterNav>
          <Link to="/">Latest Posts</Link>
          <a href="/rss.xml">RSS</a>
        </SiteFooterNav>

        <SocialLinks>
          {config.facebook && (
            <a
              href={config.facebook}
              target="_blank"
              title="Facebook"
              rel="noopener noreferrer"
            >
              <Facebook />
            </a>
          )}

          {config.twitter && (
            <a
              href={config.twitter}
              title="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </a>
          )}

          {config.github && (
            <a
              href={config.github}
              title="Github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
          )}

          {config.linkedin && (
            <a
              href={config.linkedin}
              title="Linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin />
            </a>
          )}
        </SocialLinks>
      </div>
    </footer>
  );
};

export default Footer;
