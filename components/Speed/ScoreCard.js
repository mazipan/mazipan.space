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

export default function ScoreCard ({
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
      <div className="rounded text-center">
        <div className="text-2xl font-bold">PERF</div>
        <div className={`text-6xl md:text-2xl lg:text-4xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {!isMobile && (
            <div className={`${getPerfColorClass(reportDesktop.perf)} flex justify-center`}>
              <DesktopIcon /> {reportDesktop.perf}
            </div>
          )}
          {!isDesktop && (
            <div className={`${getPerfColorClass(reportMobile.perf)} flex justify-center`}>
              <PhoneIcon /> {reportMobile.perf}
            </div>
          )}
        </div>
        <div className="p-2" style={{ minHeight: 200 }}>
          <ChartTimeline
            activeDevice={activeDevice}
            dataDesktop={allDataDesktop}
            dataMobile={allDataMobile}
            title="Perf"
            dataKey="perf"
            min={0}
            max={100}
          />
        </div>
      </div>

      <div className="rounded text-center">
        <div className="text-2xl font-bold">FID</div>
        <div className={`text-6xl md:text-2xl lg:text-4xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {!isMobile && (
            <div className={`${getFIDColorClass(reportDesktop.fid)} flex justify-center`}>
              <DesktopIcon /> {formatThousand(reportDesktop.fid)}
            </div>
          )}
          {!isDesktop && (
            <div className={`${getFIDColorClass(reportMobile.fid)} flex justify-center`}>
              <PhoneIcon /> {formatThousand(reportMobile.fid)}
            </div>
          )}
        </div>
        <div className="p-2" style={{ minHeight: 200 }}>
          <ChartTimeline
            activeDevice={activeDevice}
            dataDesktop={allDataDesktop}
            dataMobile={allDataMobile}
            title="FID"
            dataKey="fid"
            min={0}
            max={100}
          />
        </div>
      </div>

      <div className="rounded text-center">
        <div className="text-2xl font-bold">LCP</div>
        <div className={`text-6xl md:text-2xl lg:text-4xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {!isMobile && (
            <div className={`${getLCPColorClass(reportDesktop.lcp)} flex justify-center`}>
              <DesktopIcon /> {formatThousand(reportDesktop.lcp)}
            </div>
          )}
          {!isDesktop && (
            <div className={`${getLCPColorClass(reportMobile.lcp)} flex justify-center`}>
              <PhoneIcon /> {formatThousand(reportMobile.lcp)}
            </div>
          )}
        </div>
        <div className="p-2" style={{ minHeight: 200 }}>
          <ChartTimeline
            activeDevice={activeDevice}
            dataDesktop={allDataDesktop}
            dataMobile={allDataMobile}
            title="LCP"
            dataKey="lcp"
            min={0}
            max={6000}
          />
        </div>
      </div>

      <div className="rounded text-center">
        <div className="text-2xl font-bold">CLS</div>
        <div className={`text-6xl md:text-2xl lg:text-4xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {!isMobile && (
            <div className={`${getCLSColorClass(reportDesktop.cls)} flex justify-center`}>
              <DesktopIcon /> {reportDesktop.cls}
            </div>
          )}
          {!isDesktop && (
            <div className={`${getCLSColorClass(reportMobile.cls)} flex justify-center`}>
              <PhoneIcon /> {reportMobile.cls}
            </div>
          )}
        </div>
        <div className="p-2" style={{ minHeight: 200 }}>
          <ChartTimeline
            activeDevice={activeDevice}
            dataDesktop={allDataDesktop}
            dataMobile={allDataMobile}
            title="CLS"
            dataKey="cls"
            min={0}
            max={1}
          />
        </div>
      </div>

      <div className="rounded text-center">
        <div className="text-2xl font-bold">FCP</div>
        <div className={`text-6xl md:text-2xl lg:text-4xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {!isMobile && (
            <div className={'flex justify-center'}>
              <DesktopIcon /> {formatThousand(reportDesktop.fcp)}
            </div>
          )}
          {!isDesktop && (
            <div className={'flex justify-center'}>
              <PhoneIcon /> {formatThousand(reportMobile.fcp)}
            </div>
          )}
        </div>
        <div className="p-2" style={{ minHeight: 200 }}>
          <ChartTimeline
            activeDevice={activeDevice}
            dataDesktop={allDataDesktop}
            dataMobile={allDataMobile}
            title="FCP"
            dataKey="fcp"
            min={0}
            max={3000}
          />
        </div>
      </div>
      <div className="rounded text-center">
        <div className="text-2xl font-bold">TTI</div>
        <div className={`text-6xl md:text-2xl lg:text-4xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {!isMobile && (
            <div className={'flex justify-center'}>
              <DesktopIcon /> {formatThousand(reportDesktop.tti)}
            </div>
          )}
          {!isDesktop && (
            <div className={'flex justify-center'}>
              <PhoneIcon /> {formatThousand(reportMobile.tti)}
            </div>
          )}
        </div>
        <div className="p-2" style={{ minHeight: 200 }}>
          <ChartTimeline
            activeDevice={activeDevice}
            dataDesktop={allDataDesktop}
            dataMobile={allDataMobile}
            title="TTI"
            dataKey="tti"
            min={0}
            max={6000}
          />
        </div>
      </div>

      <div className="rounded text-center">
        <div className="text-2xl font-bold">Total Request</div>
        <div className={`text-6xl md:text-2xl lg:text-4xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {!isMobile && (
            <div className={'flex justify-center'}>
              <DesktopIcon /> {reportDesktop.req}
            </div>
          )}
          {!isDesktop && (
            <div className={'flex justify-center'}>
              <PhoneIcon /> {reportMobile.req}
            </div>
          )}
        </div>
        <div className="p-2" style={{ minHeight: 200 }}>
          <ChartTimeline
            activeDevice={activeDevice}
            dataDesktop={allDataDesktop}
            dataMobile={allDataMobile}
            title="Request"
            dataKey="req"
            min={0}
            max={100}
          />
        </div>
      </div>

      <div className="rounded text-center">
        <div className="text-2xl font-bold">Total Size</div>
        <div className={`text-6xl md:text-2xl lg:text-4xl font-bold text-center grid ${isAll ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {!isMobile && (
            <div className={'flex justify-center'}>
              <DesktopIcon />
              <div>
                <span className={'text-6xl md:text-2xl lg:text-4xl font-bold'}>
                  {reportDesktop.size}
                </span>
                <small className={'text-lg md:text-xl font-bold'}>
                  kB
                </small>
              </div>
            </div>
          )}
          {!isDesktop && (
            <div className={'flex justify-center'}>
              <PhoneIcon />
              <div>
                <span className={'text-6xl md:text-2xl lg:text-4xl font-bold'}>
                  {reportMobile.size}
                </span>
                <small className={'text-lg md:text-xl font-bold'}>
                  kB
                </small>
              </div>
            </div>
          )}
        </div>
        <div className="p-2" style={{ minHeight: 200 }}>
          <ChartTimeline
            activeDevice={activeDevice}
            dataDesktop={allDataDesktop}
            dataMobile={allDataMobile}
            title="Size"
            dataKey="size"
            min={0}
            max={1000}
          />
        </div>
      </div>
    </div>
  )
}
