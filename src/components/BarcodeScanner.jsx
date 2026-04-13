import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

function BarcodeScanner({ onScanSuccess }) {
  const scannerRef = useRef(null)

  useEffect(() => {
    if (scannerRef.current) return

    scannerRef.current = new Html5QrcodeScanner(
      'barcode-scanner',
      {
        fps: 10,
        qrbox: 300,
        rememberLastUsedCamera: true,
      },
      false
    )

    scannerRef.current.render(
      (decodedText) => {
        onScanSuccess(decodedText)
        scannerRef.current.clear().catch(() => {})
        scannerRef.current = null
      },
      () => {}
    )

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {})
        scannerRef.current = null
      }
    }
  }, [onScanSuccess])

  return (
    <div
      id="barcode-scanner"
      style={{ width: '100%', minHeight: '320px' }}
    />
  )
}

export default BarcodeScanner
