import { useState } from 'react'
import { createEntry } from '../firebase/firestore'
import { GENERAL_CATEGORIES } from '../utils/categoryMap'
import BarcodeScanner from '../components/BarcodeScanner'
import '../styles/entryForms.css'

import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'

/* ✅ CEO LIST */
const CEO_LIST = [
  'Elango Narayanan Servai',
  'Dr. S. Devarajan',
  'Dr. Navneetha Krishnan Balagopal',
  'A N CHANDRAMOULI',
  'Jagannath V',
  'Sharmila.S',
  'N Ramachandran',
  'Raj Kishore Naik',
  'Satish Mohanram',
  'Satish Kumar K',
  'P Ramakrishnan',
  'Jaison John',
  'Jayaram Naga Mrutyum Nanduri',
  'Solomon Jones',
  'Tirunelveli Ratnagiri Parasuraman'
]

function GeneralEntry() {
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [idCode, setIdCode] = useState('')
  const [scanning, setScanning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const isSchoolStudent = category === 'School Student'
  const isOtherCollegeStudent = category === 'Other College Student'
  const isCEO = category === 'CEO'

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!category) {
      alert('Please select category')
      return
    }

    // ✅ CEO must be selected from list
    if (isCEO && !name) {
      alert('Please select CEO name')
      return
    }

    // ✅ Other College Student: name OR QR required
    if (isOtherCollegeStudent && !name && !idCode) {
      alert('Please enter name or scan QR')
      return
    }

    // ✅ Other categories: name required
    if (!isOtherCollegeStudent && !isCEO && !name) {
      alert('Please enter name')
      return
    }

    // ✅ School student: roll number required
    if (isSchoolStudent && !idCode) {
      alert('Please enter roll number')
      return
    }

    try {
      setLoading(true)

      await createEntry({
        category,
        name: name || null,
        idCode: isSchoolStudent ? idCode : null,
        otherCollegeQrCode: isOtherCollegeStudent ? idCode || null : null,
        source: 'general'
      })

      setSuccess(true)
      setCategory('')
      setName('')
      setIdCode('')
      setScanning(false)
    } catch (err) {
      console.error(err)
      alert('Submission failed')
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

        <h2 className="entry-title">General Entry</h2>
        <p className="entry-subtitle">Visitor Registration</p>

        {success && (
          <div className="success-msg">
            Entry recorded successfully
          </div>
        )}

        <form className="entry-form" onSubmit={handleSubmit}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {GENERAL_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* ✅ CEO dropdown */}
          {isCEO && (
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <option value="">Select CEO</option>
              {CEO_LIST.map(ceo => (
                <option key={ceo} value={ceo}>
                  {ceo}
                </option>
              ))}
            </select>
          )}

          {/* Name input for non-CEO */}
          {!isCEO && (
            <input
              type="text"
              placeholder={
                isOtherCollegeStudent
                  ? 'Enter Name (optional if QR scanned)'
                  : 'Enter Name'
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* Roll number for School Student */}
          {isSchoolStudent && (
            <input
              type="text"
              placeholder="Enter Roll Number"
              value={idCode}
              onChange={(e) => setIdCode(e.target.value)}
            />
          )}

          {/* Optional QR scan for Other College Student */}
          {isOtherCollegeStudent && !scanning && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setScanning(true)}
            >
              Scan College ID (Optional)
            </button>
          )}

          {isOtherCollegeStudent && scanning && (
            <>
              <p className="scan-hint">
                Scan QR / Barcode if available
              </p>
              <BarcodeScanner
                onScanSuccess={(code) => {
                  setIdCode(code)
                  setScanning(false)
                }}
              />
            </>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Entry'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default GeneralEntry
