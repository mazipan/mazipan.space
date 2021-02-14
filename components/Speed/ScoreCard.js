import React from 'react'
import dynamic from 'next/dynamic'
import byteSize from 'byte-size'

import { formatThousand } from '@/lib/utils'
import {
  getPerfColorClass,
  getLCPColorClass,
  getFIDColorClass,
  getCLSColorClass
} from '@/lib/utils/colors'

const ChartTimeline = dynamic(() => import('@/components/ChartTimeline'), { ssr: false })

export default function ScoreCard ({ report, allData }) {
  return (
    <div className="mb-4 grid grid-cols-2 md:grid-cols-4">
      <div className="rounded text-center">
        <div className="text-2xl md:text-3xl font-bold">PERF</div>
        <div className={`text-4xl md:text-6xl font-bold ${getPerfColorClass(report.perf)}`}>
          {report.perf}
        </div>
        <ChartTimeline data={allData} title="Perf" dataKey="perf" />
      </div>

      <div className="rounded text-center">
        <div className="text-2xl md:text-3xl font-bold">FID</div>
        <div className={`text-4xl md:text-6xl font-bold ${getFIDColorClass(report.fid)}`}>
          {formatThousand(report.fid)}
        </div>
        <ChartTimeline data={allData} title="FID" dataKey="fid" />
      </div>

      <div className="rounded text-center">
        <div className="text-2xl md:text-3xl font-bold">LCP</div>
        <div className={`text-4xl md:text-6xl font-bold ${getLCPColorClass(report.lcp)}`}>
          {formatThousand(report.lcp)}
        </div>
        <ChartTimeline data={allData} title="LCP" dataKey="lcp" />
      </div>

      <div className="rounded text-center">
        <div className="text-2xl md:text-3xl font-bold">CLS</div>
        <div className={`text-4xl md:text-6xl font-bold ${getCLSColorClass(report.cls)}`}>
          {formatThousand(report.cls)}
        </div>
        <ChartTimeline data={allData} title="CLS" dataKey="cls" />
      </div>

      <div className="rounded text-center">
        <div className="text-2xl md:text-3xl font-bold">FCP</div>
        <div className={'text-4xl md:text-6xl font-bold'}>{formatThousand(report.fcp)}</div>
        <ChartTimeline data={allData} title="FCP" dataKey="fcp" />
      </div>
      <div className="rounded text-center">
        <div className="text-2xl md:text-3xl font-bold">TTI</div>
        <div className={'text-4xl md:text-6xl font-bold'}>{formatThousand(report.tti)}</div>
        <ChartTimeline data={allData} title="TTI" dataKey="tti" />
      </div>

      <div className="rounded text-center">
        <div className="text-2xl md:text-3xl font-bold">Total Request</div>
        <div className={'text-4xl md:text-6xl font-bold'}>{report.req}</div>
        <ChartTimeline data={allData} title="Request" dataKey="req" />
      </div>

      <div className="rounded text-center">
        <div className="text-2xl md:text-3xl font-bold">Total Size</div>
        <div>
          <span className={'text-4xl md:text-6xl font-bold'}>{byteSize(report.size).value}</span>
          <small className={'text-lg md:text-xl font-bold'}>{byteSize(report.size).unit}</small>
        </div>
        <ChartTimeline data={allData} title="Size" dataKey="size" />
      </div>
    </div>
  )
}
