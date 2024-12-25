const fs = require('fs')
const { join } = require('path')

function getPsiReportData () {
  const reportDir = join(process.cwd(), 'psi-reports')
  const files = fs
    .readdirSync(reportDir)
    .filter((file) => file !== 'LAST_UPDATED.txt' && file !== 'available-reports.json')
    .reverse()
  const allData = []

  files.forEach((file) => {
    const fileContent = fs.readFileSync(join(reportDir, file), 'utf8')
    const jsonData = JSON.parse(fileContent)
    const reports = jsonData.reports.map((r) => {
      return {
        ...r,
        perf: parseInt((r.perf * 100).toFixed(0), 10),
        size: parseInt((r.size / 1000).toFixed(0), 10)
      }
    })
    allData.push({
      ...jsonData,
      reports
    })
  })

  return allData
}

exports.getPsiReportData = getPsiReportData

