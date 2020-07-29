import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import MoonIcon from './icons/moon';
import SunIcon from './icons/sun';
import { trackClick } from '../utils/ga';

const Switch = styled.div`
  position: ${props => props.floating ? 'fixed' : 'absolute'};
  z-index: 101;
  top: ${props => props.floating ? 'none' : '10px'};
  bottom: ${props => props.floating ? '50px' : 'none'};
  right: 10px;
`;

const SwitchButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 0.5em;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  background-color: var(--bg-card);
  color: var(--text-color);
  cursor: pointer;
  border: 0;
  outline: 0;
`;

const ThemeSwitcher: FC = ({ floating }) => {
  // @ts-ignore
  const [theme, setTheme] = useState(typeof window !== 'undefined' ? window.__theme : 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    trackClick({
      eventCategory: 'Click Theme Switcher',
      eventLabel: `Switch to ${newTheme}`,
    });

    setTheme(newTheme);
    // @ts-ignore
    window.__setPreferredTheme(newTheme);
  };

  return (
    <Switch floating={floating}>
      <SwitchButton aria-label="Toggle dark or light theme" onClick={toggleTheme}>
        {theme === 'dark' && <SunIcon />}
        {theme === 'light' && <MoonIcon />}
      </SwitchButton>
    </Switch>
  );
};

export default ThemeSwitcher;
