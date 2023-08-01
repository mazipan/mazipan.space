import React from 'react'
import dynamic from 'next/dynamic'

import DesktopIcon from '../Icons/DevDesktop'
import PhoneIcon from '../Icons/DevPhone'

import { formatThousand } from '@/lib/utils'
import {
  getPerfColorClass,
  getLCPColorClass,
  getFIDColorClass,
  getCLSColorClass
} from '@/lib/utils/colors'

const ChartTimeline = dynamic(() => import('@/components/ChartTimeline'), { ssr: false })

const METRICS = [{
  title: "PERF",
  key: "perf",
  min: 0,
  max: 100,
  classGenerator: getPerfColorClass
}, {
  title: "FID",
  key: "fid",
  min: 0,
  max: 100,
  classGenerator: getFIDColorClass,
  formatter: formatThousand
}, {
  title: "LCP",
  key: "lcp",
  min: 0,
  max: 10000,
  classGenerator: getLCPColorClass,
  formatter: formatThousand
}, {
  title: "CLS",
  key: "cls",
  min: 0,
  max: 1,
  classGenerator: getCLSColorClass,
}, {
  title: "FCP",
  key: "fcp",
  min: 0,
  max: 3000,
  formatter: formatThousand
}, {
  title: "TTI",
  key: "tti",
  min: 0,
  max: 15000,
  formatter: formatThousand
}, {
  title: "Total Request",
  key: "req",
  min: 0,
  max: 100,
}, {
  title: "Total Size",
  key: "size",
  min: 0,
  max: 1000,
  unit: 'kB'
}]

export default function ScoreCard({
  activeDevice,
  reportDesktop,
  allDataDesktop,
  reportMobile,
  allDataMobile
}) {
  const isAll = activeDevice === 'all'
  const isMobile = activeDevice === 'mobile'
  const isDesktop = activeDevice === 'desktop'

  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-4">
      {METRICS.map(metric => (
        <div className="rounded text-center" key={metric.key}>
          <div className="text-2xl font-bold">{metric.title}</div>
          <div className={`text-2xl lg:text-3xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>

            {!isMobile && (
              <div className={`${metric.classGenerator ? metric.classGenerator(reportDesktop[metric.key]) : 'text-gray-800 dark:text-gray-200'} flex justify-center items-center`}>
                <DesktopIcon />
                <div>
                  <span>
                    {metric.formatter ? metric.formatter(reportDesktop[metric.key]) : reportDesktop[metric.key]}</span>

                  {metric.unit ? (
                    <small className={'text-lg md:text-xl font-bold'}>
                      {metric.unit}
                    </small>
                  ) : null}

                </div>
              </div>
            )}

            {!isDesktop && (
              <div className={`${metric.classGenerator ? metric.classGenerator(reportMobile[metric.key]) : 'text-gray-800 dark:text-gray-200'} flex justify-center items-center`}>
                <PhoneIcon />
                <div>
                  <span>
                    {metric.formatter ? metric.formatter(reportMobile[metric.key]) : reportMobile[metric.key]}</span>

                  {metric.unit ? (
                    <small className={'text-lg md:text-xl font-bold'}>
                      {metric.unit}
                    </small>
                  ) : null}
                </div>
              </div>
            )}

          </div>
          <div className="p-2" style={{ minHeight: 200 }}>
            <ChartTimeline
              activeDevice={activeDevice}
              dataDesktop={allDataDesktop}
              dataMobile={allDataMobile}
              title={metric.title}
              dataKey={metric.key}
              min={metric.min}
              max={metric.max}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
