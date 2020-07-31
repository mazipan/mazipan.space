// tslint:disable:no-http-string
import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Facebook from '../icons/facebook';
import Twitter from '../icons/twitter';
import Github from '../icons/github';
import Linkedin from '../icons/linkedin';

import pxToRem from '../../styles/pxToRem';
import { SocialLink } from '../../styles/shared';

import config from '../../website-config';
import { trackOutbond, trackClick } from '../../utils/ga';
import SiteNavLogo from './SiteNavLogo';

const HomeNavRaise = css`
  @media (min-width: 900px) {
    position: relative;
    top: -70px;
  }
`;

const SiteNavStyles = css`
  position: relative;
  z-index: 300;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: hidden;
  height: 40px;
`;

const SiteNavLeft = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  padding-bottom: 80px;
  letter-spacing: 0.4px;
  white-space: nowrap;

  -ms-overflow-scrolling: touch;

  @media (max-width: 700px) {
    margin-right: 0;
    padding-left: 4vw;
  }
`;

const NavStyles = css`
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;

  li {
    display: block;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }

  li a {
    display: block;
    margin: 0;
    padding: 10px 12px;
    color: #fff;
    font-size: ${pxToRem(12)};
  }
`;

const SiteNavRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 40px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  a:last-of-type {
    padding-right: 20px;
  }
`;

interface SiteNavProps {
  isHome?: boolean;
}

const SiteNav: FC<SiteNavProps> = props => {
  const { isHome = false } = props;

  const trackMenuClick = (menuName: string) => {
    trackClick({
      eventCategory: 'Click Main Menu',
      eventLabel: `Menu ${menuName}`,
    });
  };

  return (
    <nav css={[isHome && HomeNavRaise, SiteNavStyles]}>
      <SiteNavLeft>
        {!isHome && <SiteNavLogo />}
        <ul css={NavStyles} role="menu">
          {/* TODO: mark current nav item - add class nav-current */}
          <li role="menuitem">
            <Link
              to="/"
              onClick={() => {
                trackMenuClick('Home');
              }}
            >
              Home
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/about"
              onClick={() => {
                trackMenuClick('About');
              }}
            >
              About
            </Link>
          </li>
          <li role="menuitem">
            <Link
              to="/talks"
              onClick={() => {
                trackMenuClick('Talks');
              }}
            >
              Talks
            </Link>
          </li>
        </ul>
      </SiteNavLeft>
      <SiteNavRight>
        <SocialLinks>
          {config.facebook && (
            <a
              css={SocialLink}
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
              css={SocialLink}
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
              css={SocialLink}
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
              css={SocialLink}
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
      </SiteNavRight>
    </nav>
  );
};

export default SiteNav;
