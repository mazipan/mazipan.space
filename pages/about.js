import { Fragment } from 'react'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA, OG_IMAGE_ABOUT, FEATURED_OSS, CAREERS } from '@/lib/constants'

export default function AboutPage() {
  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Meta
            lang="id"
            title="ℹ️ About // mazipan.space"
            description="About the Author of mazipan.space"
            url={`${SITE_METADATA.url}/about`}
            coverImage={`${OG_IMAGE_ABOUT}`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-heading font-bold tracking-tighter leading-tight">
            ℹ️ About
          </h2>
          <div className="content">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tighter leading-tight">
              👋 Hi there, I am Irfan Maulana.
            </h2>
            <p>
              A seasoned web developer from Indonesia with 10+ years of experience in the e-commerce industry. Ex Sayurbox, Tokopedia, Bizzy Indonesia, Blibli.com, and SML Technologies.
            </p>
            <br />
            <p>
              Most of the time was working with <code className="rounded-full px-1 text-sm bg-red-100 text-red-600">JavaScript</code> & <code className="rounded-full px-1 text-sm bg-red-100 text-red-600">TypeScript</code> in the Frontend side. Was using various frameworks such as <code className="rounded-full px-1 text-sm bg-red-100 text-red-600">React</code>, <code className="rounded-full px-1 text-sm bg-red-100 text-red-600">Svelte</code>, & <code className="rounded-full px-1 text-sm bg-red-100 text-red-600">Vue</code>.
            </p>
            <br />
            <p>
              Helping OSS projects in <a
                className="text-red-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/phpid-jakarta">PHPID</a>, <a
                  className="text-red-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/reactjsid">React.js ID</a>, <a
                    className="text-red-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/kawalcovid19">KawalCovid19</a>, and many more.
            </p>

            <h3 className="text-2xl md:text-4xl font-bold my-4 tracking-tighter leading-tight">
              Career
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CAREERS.map((career) => (
                <li
                  key={career.period}
                  className="rounded-lg p-4 overflow-hidden shadow-lg border-2 border-red-500 bg-white dark:bg-gray-800"
                >
                  <h4 className="text-lg text-red-500 font-bold mb-2">
                    {career.title}
                  </h4>
                  <div className="text-sm">
                    <a
                      className="underline hover:text-red-500"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={career.link}>
                      {career.company}
                    </a>
                    {` • `}
                    <span>{career.location}</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-200">
                    <small>{career.period}</small>{` • `}<small>{career.long}</small>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl md:text-4xl font-bold my-4 tracking-tighter leading-tight">
              Featured OSS
            </h3>


            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FEATURED_OSS.map((oss) => (
                <li
                  key={oss.repo}
                  className="rounded-lg p-4 overflow-hidden shadow-lg border-2 border-red-500 bg-white dark:bg-gray-800"
                >
                  <a
                    className="hover:underline text-red-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={oss.url}
                  >
                    <h4 className="text-lg font-bold mb-4">
                      🌏 {oss.title}
                    </h4>
                  </a>
                  <p className="mb-4 text-sm">{oss.desc}</p>

                  <div className="flex justify-between">
                    <a
                      className="hover:underline text-red-500 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={oss.repo}
                    >
                      📦 {oss.repo.replace('https://github.com/', '')}
                    </a>
                    <img src={`https://img.shields.io/github/stars/${oss.repo.replace('https://github.com/', '')}.svg?style=social`} alt={oss.repo} loading="lazy" />
                  </div>

                  <div className="flex mt-4">
                    {oss.stacks.map((stack) => (
                      <span
                        key={stack}
                        className="inline-block bg-red-100 text-red-600 rounded-full px-2 py-1 text-xs font-semibold mr-2"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}
