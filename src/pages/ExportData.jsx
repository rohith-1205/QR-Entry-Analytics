import { exportToCSV, exportToExcel } from '../utils/exportUtils'

function ExportData() {
  return (
    <div style={{ padding: '40px' }}>
      <h2>Export Event Data</h2>

      <button
        onClick={exportToCSV}
        style={{ marginRight: '20px' }}
      >
        Export CSV
      </button>

      <button onClick={exportToExcel}>
        Export Excel
      </button>
    </div>
  )
}

export default ExportData
