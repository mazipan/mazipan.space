import React from 'react'
import Chart from 'react-apexcharts'
import useTheme from '@/hooks/useTheme'

const ChartTimeline = ({ data, title, dataKey }) => {
  const { theme } = useTheme()

  const series = [
    {
      name: title,
      data: data.map((item) => {
        return {
          x: item.timestamp,
          y: item[dataKey]
        }
      })
    }
  ]

  const options = {
    chart: {
      toolbar: {
        show: false
      },
      type: 'area',
      height: 200
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
      labels: {
        style: {
          colors: ['#F56565'],
          fontSize: '12px',
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: theme,
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
      }
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
      enabled: false
    },
    colors: ['#F56565', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
  }

  return (
    <div className="p-2">
      <Chart type="area" options={options} series={series} width="100%" />
    </div>
  )
}

export default ChartTimeline
