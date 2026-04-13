import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AmritaEntry from '../pages/AmritaEntry'
import GeneralEntry from '../pages/GeneralEntry'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import ExportData from '../pages/ExportData'


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralEntry />} />
        <Route path="/amrita" element={<AmritaEntry />} />
        <Route path="/general" element={<GeneralEntry />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/export" element={<ExportData />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
