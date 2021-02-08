import { Fragment, useState } from 'react'
import byteSize from 'byte-size'

import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA } from '@/lib/constants'
import { getPsiReportData } from '@/lib/api'

function getPerfColorClass (value) {
  if (value <= 0.49) {
    return 'text-red-600'
  }
  if (value <= 0.89) {
    return 'text-orange-500'
  }

  return 'text-green-500'
}

function getWebVitalColorClass (value, good, avg) {
  if (value <= good) {
    return 'text-green-500'
  }

  if (value <= avg) {
    return 'text-orange-500'
  }

  return 'text-red-600'
}

function getLCPColorClass (value) {
  return getWebVitalColorClass(value, 2500, 4000)
}

function getFIDColorClass (value) {
  return getWebVitalColorClass(value, 100, 300)
}

function getCLSColorClass (value) {
  return getWebVitalColorClass(value, 0.1, 0.25)
}

export default function Speed ({ data }) {
  const [expanded, setExpanded] = useState('')
  const newestTimestamp = data[0].timestamp

  const isNewestTimestamp = (timestamp) => timestamp === newestTimestamp

  const getExpandedClass = (timestamp) => {
    if (!isNewestTimestamp(timestamp)) {
      return timestamp === expanded ? 'show' : 'hidden'
    }
    return ''
  }

  const handleExpand = (timestamp) => {
    if (!isNewestTimestamp(timestamp)) {
      if (expanded === timestamp) {
        setExpanded('')
      } else {
        setExpanded(timestamp)
      }
    }
  }

  return (
    <>
      <LayoutArticle>
        <Fragment>
          <Meta
            title="Speed | mazipan.space"
            description="Speed | mazipan.space"
            url={`${SITE_METADATA.url}/speed`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            Speed ⚡️
          </h2>
          <div className="content">

            <div className="mb-4">
              Data generated by{' '}
              <a
                href="https://github.com/mazipan/psi-gh-action"
                target="_blank"
                rel="noreferrer"
                alt="psi-gh-action"
                className="border-dashed border-red-500 border-b-2 text-red-500"
              >
                psi-gh-action
              </a>
            </div>
            {data.map((d) => (
                <div
                  className={`px-6 py-4 mb-2 rounded-lg overflow-hidden shadow-lg ${isNewestTimestamp(d.timestamp) ? '' : 'dark:bg-gray-800 cursor-pointer'}`}
                  key={d.timestamp}
                  onClick={() => {
                    handleExpand(d.timestamp)
                  }}
                >
                  <h3 className="mb-4 text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
                    🗓 {d.timestamp.substring(0, 10)}
                  </h3>

                  <div className={`expander ${getExpandedClass(d.timestamp)}`}>
                    {d.reports &&
                      d.reports.map((report) => (
                        <div key={`${report.url}${report.device}`}>
                          <h4 className="mb-4 text-lg md:text-xl font-bold capitalize">
                            {report.device === 'desktop' ? '💻' : '📱'} {report.device}
                          </h4>
                          <div className="mb-4 grid grid-cols-2 md:grid-cols-4">
                            <div className="mb-2 mr-2 px-6 py-4 rounded text-center">
                              <small>PERF</small>
                              <div
                                className={`text-4xl md:text-6xl font-bold ${getPerfColorClass(
                                  report.perf
                                )}`}
                              >
                                {report.perf * 100}
                              </div>
                            </div>

                            <div className="mb-2 mr-2 px-6 py-4 rounded text-center">
                              <small>FID</small>
                              <div
                                className={`text-4xl md:text-6xl font-bold ${getFIDColorClass(
                                  report.fid
                                )}`}
                              >
                                {report.fid}
                              </div>
                            </div>

                            <div className="mb-2 mr-2 px-6 py-4 rounded text-center">
                              <small>LCP</small>
                              <div
                                className={`text-4xl md:text-6xl font-bold ${getLCPColorClass(
                                  report.lcp
                                )}`}
                              >
                                {report.lcp}
                              </div>
                            </div>

                            <div className="mb-2 mr-2 px-6 py-4 rounded text-center">
                              <small>CLS</small>
                              <div
                                className={`text-4xl md:text-6xl font-bold ${getCLSColorClass(
                                  report.cls
                                )}`}
                              >
                                {report.cls}
                              </div>
                            </div>

                            <div className="mb-2 mr-2 px-6 py-4 rounded text-center">
                              <small>FCP</small>
                              <div
                                className={'text-4xl md:text-6xl font-bold'}
                              >
                                {report.fcp}
                              </div>
                            </div>
                            <div className="mb-2 mr-2 px-6 py-4 rounded text-center">
                              <small>TTI</small>
                              <div
                                className={'text-4xl md:text-6xl font-bold'}
                              >
                                {report.tti}
                              </div>
                            </div>

                            <div className="mb-2 mr-2 px-6 py-4 rounded text-center">
                              <small>Total Request</small>
                              <div
                                className={'text-4xl md:text-6xl font-bold'}
                              >
                                {report.req}
                              </div>
                            </div>

                            <div className="mb-2 mr-2 px-6 py-4 rounded text-center">
                              <small>Total Size</small>
                              <div
                              >
                                <span className={'text-4xl md:text-6xl font-bold'}>{byteSize(report.size).value}</span>
                                <small className={'text-lg md:text-xl font-bold'}>{byteSize(report.size).unit}</small>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                  </div>
                </div>
            ))}

          </div>
        </Fragment>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps () {
  const data = getPsiReportData()

  return {
    props: {
      data
    }
  }
}