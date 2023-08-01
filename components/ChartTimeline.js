import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import useTheme from '@/hooks/useTheme'

const ORANGE = '#F56565'
const SERIES_M = '#D10CE8'
const SERIES_D = '#66DA26'

const DEFAULT_CHART_OPTIONS = {
  chart: {
    type: 'area',
    toolbar: {
      show: false
    }
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
    },
    labels: {
      show: true,
      style: {
        colors: [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
        fontSize: '0.9rem'
      }
    }
  },
  yaxis: {
    show: true,
    tickAmount: 5,
    labels: {
      show: true,
      style: {
        colors: [ORANGE],
        fontSize: '0.9rem'
      }
    },
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
    }
  },
  stroke: {
    show: true,
    width: 3,
    curve: 'smooth'
  },
  fill: {
    type: 'solid'
  },
  markers: {
    size: 3,
    hover: {
      size: 5
    }
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  }
}

const ChartTimeline = ({
  activeDevice,
  dataDesktop,
  dataMobile,
  title,
  dataKey,
  min = 0,
  max = 100
}) => {
  const [chartOptions, setChartOptions] = useState(DEFAULT_CHART_OPTIONS)
  const { theme } = useTheme()

  const seriesDesktop = {
    name: `${title} - Desktop`,
    type: 'line',
    data: dataDesktop.map((item) => {
      return {
        x: item.timestamp,
        y: item[dataKey]
      }
    })
  }

  const seriesMobile = {
    name: `${title} - Mobile`,
    type: 'line',
    data: dataMobile.map((item) => {
      return {
        x: item.timestamp,
        y: item[dataKey]
      }
    })
  }

  const activeSeries = [
    activeDevice !== 'desktop' ? seriesMobile : null,
    activeDevice !== 'mobile' ? seriesDesktop : null
  ].filter(Boolean)

  const series = activeDevice === 'all' && dataKey === 'perf' ? activeSeries : activeSeries


  useEffect(() => {
    const colors = [
      activeDevice !== 'mobile' ? SERIES_M : '',
      activeDevice !== 'desktop' ? SERIES_D : ''
    ].filter(Boolean)

    const newOptions = {
      ...DEFAULT_CHART_OPTIONS,
      ...{
        colors
      },
      ...{
        tooltip: {
          theme: theme
        }
      },
      ...{
        yaxis: {
          ...DEFAULT_CHART_OPTIONS.yaxis,
          min,
          max
        }
      }
    }

    setChartOptions(newOptions)
  }, [activeDevice, max, min, theme])

  return <Chart type="line" height={200} options={chartOptions} series={series} width="100%" />
}

export default ChartTimeline
