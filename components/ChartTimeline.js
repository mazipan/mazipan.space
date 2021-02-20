import React from 'react'
import Chart from 'react-apexcharts'
import useTheme from '@/hooks/useTheme'

const ChartTimeline = ({
  activeDevice,
  dataDesktop,
  dataMobile,
  title,
  dataKey,
  min = 0,
  max = 100
}) => {
  const { theme } = useTheme()

  const seriesDesktop = {
    name: `${title} - Desktop`,
    data: dataDesktop.map((item) => {
      return {
        x: item.timestamp,
        y: item[dataKey]
      }
    })
  }

  const seriesMobile = {
    name: `${title} - Mobile`,
    data: dataMobile.map((item) => {
      return {
        x: item.timestamp,
        y: item[dataKey]
      }
    })
  }

  const series = [
    activeDevice !== 'mobile' ? seriesDesktop : null,
    activeDevice !== 'desktop' ? seriesMobile : null
  ].filter(Boolean)

  const colors = [activeDevice !== 'mobile' ? '#D10CE8' : '', activeDevice !== 'desktop' ? '#66DA26' : ''].filter(Boolean)

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '10px'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: true,
      tickAmount: 5,
      min,
      max,
      labels: {
        style: {
          colors: ['#F56565'],
          fontSize: '1rem'
        }
      }
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent']
    },
    fill: {
      type: 'solid'
    },
    markers: {
      size: 0,
      style: 'hollow',
      hover: {
        size: 4
      }
    },
    tooltip: {
      theme: theme
    },
    grid: {
      show: false
    },
    dataLabels: {
      enabled: false,
      position: 'top'
    },
    colors
  }

  return <Chart type="bar" height={200} options={options} series={series} width="100%" />
}

export default ChartTimeline
