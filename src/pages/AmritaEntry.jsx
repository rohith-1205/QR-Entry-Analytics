import { useState } from 'react'
import { createEntry } from '../firebase/firestore'
import { AMRITA_CATEGORIES } from '../utils/categoryMap'
import BarcodeScanner from '../components/BarcodeScanner'
import '../styles/entryForms.css'

import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'

function AmritaEntry() {
  const [category, setCategory] = useState('')
  const [idCode, setIdCode] = useState('')
  const [scanning, setScanning] = useState(false)
  const [manualMode, setManualMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleStartScan = () => {
    setIdCode('')
    setSuccess(false)
    setManualMode(false)
    setScanning(true)
  }

  const handleScanSuccess = (code) => {
    setIdCode(code)
    setScanning(false)
    setManualMode(false)
  }

  const handleManualEntry = () => {
    setScanning(false)
    setManualMode(true)
    setIdCode('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!category || !idCode) {
      alert('Please select category and enter/scan ID')
      return
    }

    try {
      setLoading(true)

      await createEntry({
        category,
        idCode,
        source: 'amrita'
      })

      setSuccess(true)
      setCategory('')
      setIdCode('')
      setManualMode(false)
    } catch (err) {
      console.error(err)
      alert('Submission failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="entry-page">
      <div className="entry-card">

        {/* 🔰 LOGOS */}
        <div className="entry-logos">
          <img src={logo1} alt="Logo 1" />
          <img src={logo2} alt="Logo 2" />
        </div>

        <h2 className="entry-title">Amrita Entry</h2>
        <p className="entry-subtitle">Students & Faculty</p>

        {success && (
          <div className="success-msg">
            Entry recorded successfully
          </div>
        )}

        <form className="entry-form" onSubmit={handleSubmit}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {AMRITA_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder={manualMode ? 'Enter Roll / Employee ID' : 'Scanned ID will appear here'}
            value={idCode}
            onChange={(e) => manualMode && setIdCode(e.target.value)}
            readOnly={!manualMode}
          />

          {!scanning && !manualMode && (
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleStartScan}
              >
                Start Scan
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleManualEntry}
              >
                Enter ID Manually
              </button>
            </>
          )}

          {scanning && (
            <>
              <p className="scan-hint">
                Align the barcode inside the camera view
              </p>
              <BarcodeScanner onScanSuccess={handleScanSuccess} />
            </>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !idCode}
          >
            {loading ? 'Submitting...' : 'Submit Entry'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AmritaEntry
