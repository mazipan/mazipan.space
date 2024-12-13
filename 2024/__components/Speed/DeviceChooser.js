import React from 'react'

import TriangleIcon from '../Icons/DevTriangle'
import DesktopIcon from '../Icons/DevDesktop'
import PhoneIcon from '../Icons/DevPhone'

const DeviceChooser = ({ activeDevice, onChangeDevice }) => {
  const handleChangeDevice = (newDevice) => {
    onChangeDevice(newDevice)
  }

  return (
    <div className="my-4 flex">
      <div
        className={`p-2 flex cursor-pointer overflow-hidden rounded-tl-lg rounded-bl-lg border-2 border-red-500 ${
          activeDevice === 'all' ? 'text-white bg-red-500' : 'text-red-500'
        }`}
        onClick={() => {
          handleChangeDevice('all')
        }}
      >
        <TriangleIcon />
        <span className="ml-2">All</span>
      </div>

      <div
        className={`p-2 flex cursor-pointer overflow-hidden border-t-2 border-b-2 border-red-500 ${
          activeDevice === 'desktop' ? 'text-white bg-red-500' : 'text-red-500'
        }`}
        onClick={() => {
          handleChangeDevice('desktop')
        }}
      >
        <DesktopIcon />
        <span className="ml-2">Desktop</span>
      </div>

      <div
        className={`p-2 flex cursor-pointer overflow-hidden rounded-tr-lg rounded-br-lg border-2 border-red-500 ${
          activeDevice === 'mobile' ? 'text-white bg-red-500' : 'text-red-500'
        }`}
        onClick={() => {
          handleChangeDevice('mobile')
        }}
      >
        <PhoneIcon />
        <span className="ml-2">Mobile</span>
      </div>
    </div>
  )
}

export default DeviceChooser
