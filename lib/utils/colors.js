function getPerfColorClass (value) {
  if (value <= 49) {
    return 'text-red-600'
  }
  if (value <= 89) {
    return 'text-orange-500'
  }

  return 'text-emerald-500'
}

function getWebVitalColorClass (value, good, avg) {
  if (value <= good) {
    return 'text-emerald-500'
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

exports.getPerfColorClass = getPerfColorClass
exports.getLCPColorClass = getLCPColorClass
exports.getFIDColorClass = getFIDColorClass
exports.getCLSColorClass = getCLSColorClass
