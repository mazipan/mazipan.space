
import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import MoonIcon from './icons/moon';
import SunIcon from './icons/sun';
import { trackClick } from '../utils/ga';

const Switch = styled.div`
  position: absolute;
  z-index: 20;
  top: 1rem;
  right: 1.5rem;
`;

const SwitchButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: .5em;
  box-shadow: rgba(39,44,49,0.06) 8px 14px 38px, rgba(39,44,49,0.03) 1px 3px 8px;
  background-color: var(--bg-card);
`;

const ThemeSwitcher: FC = () => {
  // @ts-ignore
  const [theme, setTheme] = useState(typeof window !== `undefined` ? window.__theme : 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    trackClick({
      eventCategory: 'Click Theme Switcher',
      eventLabel: `Switch to ${newTheme}`
    })

    setTheme(newTheme);
    // @ts-ignore
    window.__setPreferredTheme(newTheme);
  }

  return (
    <Switch>
      <SwitchButton aria-label="Toggle dark or light theme" onClick={toggleTheme}>
        {theme === 'dark' && (<SunIcon/>)}
        {theme === 'light' && (<MoonIcon/>)}
      </SwitchButton>
    </Switch>
  )
}

export default ThemeSwitcher;
