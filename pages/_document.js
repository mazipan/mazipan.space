import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang="id">
        <Head />
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
        <link rel="webmention" href="https://webmention.io/mazipan.space/webmention" />
        <link rel="pingback" href="https://webmention.io/mazipan.space/xmlrpc" />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
