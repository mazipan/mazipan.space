import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="id" className="dark">
        <Head />
        <link rel="authorization_endpoint" href="https://indieauth.com/auth" />

        <link href="https://github.com/mazipan" rel="me" />
        <link href="https://twitter.com/maz_ipan" rel="me" />

        <link rel="webmention" href="https://webmention.io/mazipan.space/webmention" />
        <link rel="pingback" href="https://webmention.io/mazipan.space/xmlrpc" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&family=Work+Sans&display=swap" rel="stylesheet" />

        <body className="dark:bg-gray-900">
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function() {
              window.__onThemeChange = function() {};
              function setTheme(newTheme) {
                window.__theme = newTheme;
                preferredTheme = newTheme;
                if (newTheme === 'dark') {
                  document.documentElement.classList.add('dark')
                  document.documentElement.classList.remove('light')
                } else {
                  document.documentElement.classList.remove('dark')
                  document.documentElement.classList.add('light')
                }
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

          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YJXV2DX7V8" />
          <Script id="google-analytics" strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-YJXV2DX7V8');
            `}
          </Script>

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5442972248172818"
            crossOrigin="anonymous"
          />
        </body>
      </Html>
    )
  }
}
