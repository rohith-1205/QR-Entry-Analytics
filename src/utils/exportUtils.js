import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

function formatDateTime(timestamp) {
  if (!timestamp || !timestamp.toDate) {
    return { date: '', time: '' }
  }

  const d = timestamp.toDate()

  return {
    date: d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    time: d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }
}

async function fetchEntriesForExport() {
  const snapshot = await getDocs(collection(db, 'entries'))

  return snapshot.docs.map(doc => {
    const data = doc.data()
    const { date, time } = formatDateTime(data.timestamp)

    const isAmrita =
      data.category === 'Amrita Student' ||
      data.category === 'Amrita Faculty'

    const isOtherCollegeStudent =
      data.category === 'Other College Student'

    return {
      Count: data.footfallCount ?? '',   // ✅ NEW COLUMN
      Date: date,
      Time: time,
      Category: data.category || '',
      Source: data.source || '',
      Name: isAmrita ? '' : (data.name || ''),
      RollNumber: isAmrita
        ? (data.idCode || '')
        : (data.category === 'School Student' ? data.idCode || '' : ''),
      OtherCollegeQRCode: isOtherCollegeStudent
        ? (data.otherCollegeQrCode || '')
        : ''
    }
  })
}

export async function exportToCSV() {
  const data = await fetchEntriesForExport()
  const csv = Papa.unparse(data)

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'event_entries.csv'
  link.click()
}

export async function exportToExcel() {
  const data = await fetchEntriesForExport()

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Entries')

  XLSX.writeFile(workbook, 'event_entries.xlsx')
}
