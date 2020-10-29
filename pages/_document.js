import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang="id">
        <Head />
        <link rel="webmention" href="https://webmention.io/mazipan.space/webmention" />
        <link rel="pingback" href="https://webmention.io/mazipan.space/xmlrpc" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-25065548-7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-25065548-7');
              `
          }}
        />

        <body className="dark:bg-gray-800">
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function() {
              window.__onThemeChange = function() {};
              function setTheme(newTheme) {
                window.__theme = newTheme;
                preferredTheme = newTheme;
                document.body.className = newTheme;
                window.__onThemeChange(newTheme);
              }
              var preferredTheme;
              try {
                preferredTheme = localStorage.getItem('theme');
              } catch (err) { }
              window.__setPreferredTheme = function(newTheme) {
                setTheme(newTheme);
                try {
                  localStorage.setItem('theme', newTheme);
                } catch (err) {}
              }
              var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
              darkQuery.addListener(function(e) {
                window.__setPreferredTheme(e.matches ? 'dark' : 'light')
              });
              setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
            })();
              `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
