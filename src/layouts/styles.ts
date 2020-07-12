
import { css } from '@emotion/core';
import { lighten } from 'polished';
import { colors } from '../styles/colors';

const GlobalStyles = css`
  .dark {
    --text-color: #f8f8f2;
    --text-title-color: #bd93f9;
    --text-subtitle-color: #ff79c6;
    --text-color-grey: #b4b5b5;
    --text-link-color: #57c3ff;
    --bg-content: #282a36;
    --bg-card: #44475a;
    --bg-card-comment: #6272a4;

    --bg-inline-code: rgb(14, 16, 18);
    --text-inline-code: #f8f8f2;

    --bg-header: #212121;
    --text-header: #fff;
    --bg-gradient: linear-gradient(to right, #DA22FF 0%, #9733EE 51%, #DA22FF 100%)
  }

  .light {
    --text-color: #2d373b;
    --text-title-color: #6272a4;
    --text-subtitle-color: #ff79c6;
    --text-color-grey: #647a83;
    --text-link-color: #57c3ff;
    --bg-content: #f3f8fb;
    --bg-card: #fff;
    --bg-card-comment: #15171A;

    --bg-inline-code: #44475a;
    --text-inline-code: #f8f8f2;

    --bg-header: #212121;  /* keep same with dark */
    --text-header: #fff;
    --bg-gradient: linear-gradient(to right, #fe8c00 0%, #f83600 51%, #fe8c00 100%);
  }

  html,
  body,
  div,
  span,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  code,
  em,
  img,
  q,
  s,
  small,
  strike,
  strong,
  ol,
  ul,
  li,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  menu,
  nav,
  section,
  summary,
  time,
  mark {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
  }
  img {
    max-width: 100%;
  }
  html {
    box-sizing: border-box;
    font-family: sans-serif;

    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  a {
    background-color: transparent;
  }
  a:active,
  a:hover {
    outline: 0;
  }
  b,
  strong {
    font-weight: bold;
  }
  i,
  em {
    font-style: italic;
  }
  h1 {
    margin: 0.67em 0;
    font-size: 2em;
  }
  small {
    font-size: 80%;
  }
  img {
    border: 0;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
    color: inherit;
    font: inherit;
  }
  button {
    overflow: visible;
    border: none;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  html input[type='button'],
  input[type='reset'],
  input[type='submit'] {
    cursor: pointer;
    -webkit-appearance: button;
  }
  button[disabled],
  html input[disabled] {
    cursor: default;
  }
  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  input {
    line-height: normal;
  }
  input:focus {
    outline: none;
  }
  textarea {
    overflow: auto;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
  }
  td,
  th {
    padding: 0;
  }

  html {
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 62.5%;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  body {
    overflow-x: hidden;
    color: var(--text-color);
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    line-height: 1.6em;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0;
    text-rendering: optimizeLegibility;
    background: var(--bg-content);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: 'liga' on;
  }

  ::selection {
    text-shadow: none;
    background: ${lighten('0.3', colors.blue)};
  }

  hr {
    position: relative;
    display: block;
    width: 100%;
    margin: 2.5em 0 3.5em;
    padding: 0;
    height: 1px;
    border: 0;
    border-top: 1px solid ${lighten('0.1', colors.lightgrey)};
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }

  textarea {
    resize: vertical;
  }

  p,
  ul,
  ol,
  dl,
  blockquote {
    margin: 0 0 1.5em 0;
  }

  ol,
  ul {
    padding-left: 1.3em;
    padding-right: 1.5em;
  }

  ol ol,
  ul ul,
  ul ol,
  ol ul {
    margin: 0.5em 0 1em;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul,
  ol {
    max-width: 100%;
  }

  li {
    margin: 0.5em 0;
    padding-left: 0.3em;
    line-height: 1.6em;
  }

  dt {
    float: left;
    margin: 0 20px 0 0;
    width: 120px;
    color: ${colors.darkgrey};
    font-weight: 500;
    text-align: right;
  }

  dd {
    margin: 0 0 5px 0;
    text-align: left;
  }

  blockquote {
    margin: 1.5em 0;
    padding: 0 1.6em 0 1.6em;
    border-left: ${colors.whitegrey} 0.5em solid;
  }

  blockquote p {
    margin: 0.8em 0;
    font-size: 1.2em;
    font-weight: 300;
  }

  blockquote small {
    display: inline-block;
    margin: 0.8em 0 0.8em 1.5em;
    font-size: 0.9em;
    opacity: 0.8;
  }

  blockquote small:before {
    content: '\\2014 \\00A0';
  }

  blockquote cite {
    font-weight: bold;
  }
  blockquote cite a {
    font-weight: normal;
  }

  a {
    color: var(--text-link-color);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    line-height: 1.15;
    font-weight: 700;
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin: 0 0 0.5em 0;
    font-size: 5rem;
    font-weight: 700;
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 2.2rem;
    }
  }

  h2 {
    margin: 1.5em 0 0.5em 0;
    font-size: 2rem;
  }
  @media (max-width: 500px) {
    h2 {
      font-size: 1.8rem;
    }
  }

  h3 {
    margin: 1.5em 0 0.5em 0;
    font-size: 1.8rem;
    font-weight: 500;
  }
  @media (max-width: 500px) {
    h3 {
      font-size: 1.7rem;
    }
  }

  h4 {
    margin: 1.5em 0 0.5em 0;
    font-size: 1.6rem;
    font-weight: 500;
  }

  h5 {
    margin: 1.5em 0 0.5em 0;
    font-size: 1.4rem;
    font-weight: 500;
  }

  h6 {
    margin: 1.5em 0 0.5em 0;
    font-size: 1.4rem;
    font-weight: 500;
  }

  body {
    background: var(--bg-content);
  }


  /* Start Syntax Highlighting */
  /* Taken from overreacted https://github.com/gaearon/overreacted.io/blob/942b41555f5e5ccbb5f93f6c26142cd90b314236/src/utils/global.css#L68 */
  /**
   * Based on copypasta from Remy Bach and Sarah Drasner
   */
  code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: none;
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
    font-feature-settings: normal;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    overflow: auto;
    padding: 1.3125rem;
  }

  pre[class*='language-']::-moz-selection {
    /* Firefox */
    background: hsl(207, 4%, 16%);
  }

  pre[class*='language-']::selection {
    /* Safari */
    background: hsl(207, 4%, 16%);
  }

  /* Text Selection colour */
  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    border-radius: 0.3em;
    background: var(--bg-inline-code);
    color: var(--text-inline-code);
    padding: 0.15em 0.2em 0.05em;
    white-space: normal;
  }

  .token.attr-name {
    color: rgb(173, 219, 103);
    font-style: italic;
  }

  .token.comment {
    color: rgb(128, 147, 147);
  }

  .token.string,
  .token.url {
    color: rgb(173, 219, 103);
  }

  .token.variable {
    color: rgb(214, 222, 235);
  }

  .token.number {
    color: rgb(247, 140, 108);
  }

  .token.builtin,
  .token.char,
  .token.constant,
  .token.function {
    color: rgb(130, 170, 255);
  }

  .token.punctuation {
    color: rgb(199, 146, 234);
  }

  .token.selector,
  .token.doctype {
    color: rgb(199, 146, 234);
    font-style: 'italic';
  }

  .token.class-name {
    color: rgb(255, 203, 139);
  }

  .token.tag,
  .token.operator,
  .token.keyword {
    color: #ffa7c4;
  }

  .token.boolean {
    color: rgb(255, 88, 116);
  }

  .token.property {
    color: rgb(128, 203, 196);
  }

  .token.namespace {
    color: rgb(178, 204, 214);
  }

  pre[data-line] {
    padding: 1em 0 1em 3em;
    position: relative;
  }

  .gatsby-highlight-code-line {
    background-color: hsla(207, 95%, 15%, 1);
    display: block;
    margin-right: -1.3125rem;
    margin-left: -1.3125rem;
    padding-right: 1em;
    padding-left: 1.25em;
    border-left: 0.25em solid #ffa7c4;
  }

  .gatsby-highlight {
    margin-bottom: 1.75rem;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
    border-radius: 10px;
    background: #011627;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  @media (max-width: 672px) {
    .gatsby-highlight {
      border-radius: 0;
    }
  }

  .gatsby-highlight pre[class*='language-'] {
    float: left;
    min-width: 100%;
  }
  /* End Syntax Highlighting */
`;

export default GlobalStyles;
