
import { css } from '@emotion/core';
import normalize from '../styles/normalize';

const GlobalStyles = css`
  .dark {
    --text-color: #f8f8f2;
    --text-title-color: #bd93f9;
    --text-subtitle-color: #ff79c6;
    --text-subsubtitle-color: #ff5555;
    --text-sub3title-color: #ffb86c;
    --text-sub4title-color: #8be9fd;
    --text-sub5title-color: #50fa7b;
    --text-color-grey: #b4b5b5;
    --text-link-color: #8be9fd;
    --bg-content: #100e17;
    --bg-card: #17141d    ;
    --bg-card-comment: #6272a4;

    --bg-inline-code: rgb(51, 53, 54);
    --text-inline-code: #f8f8f2;

    --bg-header: #212121;
    --text-header: #fff;
    --bg-gradient: linear-gradient(to right, #DA22FF 0%, #9733EE 51%, #DA22FF 100%);
    --bg-gradient-vertical: linear-gradient(90deg, #ff8a00, #e52e71);
  }

  .light {
    --text-color: #2d373b;
    --text-title-color: #6272a4;
    --text-subtitle-color: #ff79c6;
    --text-subsubtitle-color: #ff5555;
    --text-sub3title-color: #ffb86c;
    --text-sub4title-color: #8be9fd;
    --text-sub5title-color: #50fa7b;
    --text-color-grey: #647a83;
    --text-link-color: #bd93f9;
    --bg-content: #f3f8fb;
    --bg-card: #fff;
    --bg-card-comment: #15171A;

    --bg-inline-code: #44475a;
    --text-inline-code: #f8f8f2;

    --bg-header: #212121;  /* keep same with dark */
    --text-header: #fff;
    --bg-gradient: linear-gradient(to right, #ff8a00 0%, #e52e71 100%);
    --bg-gradient-vertical: linear-gradient(90deg, #DA22FF, #9733EE);
  }

  ${normalize}

  *:focus{
    outline:none
  }
  html{
    box-sizing:border-box;
    font-size:14px;
  }

  html,body{
    margin:0;
    padding:0;
    height:100%;
  }

  *,*::before,*::after{box-sizing:inherit}

  body {
    background: var(--bg-content);
    color: var(--text-color);
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
    background: var(--bg-content);

    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  blockquote {
    margin: 1.5em 0;
    padding: 0 1.6em 0 1.6em;
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
