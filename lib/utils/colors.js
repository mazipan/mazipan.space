const RED_COLOR = 'text-red-600'
const ORANGE_COLOR = 'text-orange-500'
const GREEN_COLOR = 'text-green-500'

function getPerfColorClass (value) {
  if (value <= 49) {
    return RED_COLOR
  }
  if (value <= 89) {
    return ORANGE_COLOR
  }

  return GREEN_COLOR
}

function getWebVitalColorClass (value, good, avg) {
  if (value <= good) {
    return GREEN_COLOR
  }

  if (value <= avg) {
    return ORANGE_COLOR
  }

  return RED_COLOR
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

exports.getPerfColorClass = getPerfColorClass
exports.getLCPColorClass = getLCPColorClass
exports.getFIDColorClass = getFIDColorClass
exports.getCLSColorClass = getCLSColorClass
