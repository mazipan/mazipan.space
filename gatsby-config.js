const path = require('path');
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const SITE_NAME = process.env.SITE_NAME || '@mazipan';
const FULL_DOMAIN = process.env.FULL_DOMAIN || 'https://mazipan.space';

module.exports = {
  siteMetadata: {
    lang: 'id',
    title: SITE_NAME,
    description: 'A personal blog by mazipan',
    siteUrl: FULL_DOMAIN,
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'src', 'content'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-abbr',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              quality: 50,
              withWebp: true,
              showCaptions: ['alt', 'title']
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: 'mazipan',
              includeDefaultCss: true
            }
          }
        ],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: FULL_DOMAIN,
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-color-function'), require('cssnano')()],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_KEY,
        // Puts tracking script in the head instead of the body
        head: true,
        // IP anonymization for GDPR compliance
        anonymize: true,
        // Disable analytics for users with `Do Not Track` enabled
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        pageTransitionDelay: 300,
        // Specifies what percentage of users should be tracked
        sampleRate: 100,
        // Determines how often site speed tracking beacons will be sent
        siteSpeedSampleRate: 100,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `@mazipan`,
        short_name: `@mazipan`,
        start_url: `/`,
        background_color: `#f4f8fb`,
        theme_color: `#15171A`,
        display: `standalone`,
        icon: `src/static/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/about/`],
        workboxConfig: {
          importWorkboxFrom: `cdn`,
          cacheId: `mazipan`,
          // Don't cache-bust JS or CSS files, and anything in the static directory,
          // since these files have unique URLs and their contents will never change
          dontCacheBustURLsMatching: /(\.js$|\.css$|static\/)/,
          runtimeCaching: [
            {
              // page-data.json files are not content hashed
              urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
              handler: `NetworkFirst`,
            },
            {
              // Use cacheFirst since these don't need to be revalidated (same RegExp
              // and same reason as above)
              urlPattern: /(\.js$|\.css$|static|images\/)/,
              handler: `CacheFirst`,
            },
            {
              urlPattern: /^https?:.*\.(js|json|css)$/,
              handler: `StaleWhileRevalidate`,
            },
            {
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|woff|woff2)$/,
              handler: `CacheFirst`,
            },
            {
              urlPattern: /^https?:\/\/(api|fonts)\.googleapis\.com\/.*/,
              handler: `CacheFirst`,
            },
            {
              urlPattern: /^https?:\/\/github\.githubassets\.com\/.*/,
              handler: `CacheFirst`,
            },
            {
              urlPattern: /^https?:\/\/raw\.githubusercontent\.com\/.*/,
              handler: `CacheFirst`,
            },
          ],
          skipWaiting: true,
          clientsClaim: true,
        }
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "mazipan.space RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-advanced-sitemap',
      options: {
        exclude: [
          `/404`,
          `/404.html`,
          /(\/)?hash-\S*/, // you can also pass valid RegExp to exclude internal tags for example
        ],
        // addUncaughtPages: true,
        query: `
        {
          allAuthorYaml {
            edges {
              node {
                id
                slug
              }
            }
          }
          allTagYaml {
            edges {
              node {
                id
                slug
              }
            }
          }
          allMarkdownRemark (
            filter: {
              frontmatter: {
                draft: {
                  ne: true
                }
                lang: {
                  eq: "id"
                }
              }
            },
          ) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `,
        mapping: {
          allAuthorYaml: {
            sitemap: `authors`,
          },
          allTagYaml: {
            sitemap: `tags`,
          },
          allMarkdownRemark: {
            sitemap: `posts`,
          },
        },
      }
    },
    'gatsby-plugin-netlify-cache',
    // {
    //   resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
    //   options: {
    //     analyzerMode: "static",
    //     defaultSizes: "gzip",
    //     openAnalyzer: false
    //   },
    // },
  ],
};
