import { useEffect, useRef, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import CounterCard from '../components/CounterCard'
import '../styles/dashboard.css'

import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'
import logo4 from '../assets/logo4.png'
import logo5 from '../assets/logo5.png'
import logo6 from '../assets/logo6.png'
import logo7 from '../assets/logo7.png'
import logo8 from '../assets/logo8.png'

const DAY1_BASE_FOOTFALL = 1103
const DAY2_BASE_FOOTFALL = 1621
const NITI_TANSCST_COUNT = 15

// ✅ cumulative total up to end of Day 2
const PREVIOUS_TOTAL_BASE = DAY1_BASE_FOOTFALL + DAY2_BASE_FOOTFALL

function Dashboard() {
  const [counts, setCounts] = useState({})
  const [showConfetti, setShowConfetti] = useState(false)
  const [milestoneText, setMilestoneText] = useState('')
  const prevTotalRef = useRef(0)

  useEffect(() => {
    const ref = doc(db, 'counts', 'live')

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setCounts(snap.data())
      }
    })

    return () => unsub()
  }, [])

  /* 🔢 LIVE FIRESTORE COUNT */
  const liveFootfall =
    (counts.amritaStudents ?? 0) +
    (counts.amritaFaculty ?? 0) +
    (counts.otherCollegeStudents ?? 0) +
    (counts.otherCollegeFaculty ?? 0) +
    (counts.schoolStudents ?? 0) +
    (counts.staffOthers ?? 0) +
    (counts.ceo ?? 0) +
    (counts.guest ?? 0)

  /* 📅 DAY SPLIT */
  const day1Footfall = DAY1_BASE_FOOTFALL
  const day2Footfall = DAY2_BASE_FOOTFALL
  const day3Footfall = Math.max(liveFootfall - PREVIOUS_TOTAL_BASE, 0)+15 // ✅ FIXED

  /* 🔢 TOTAL FOOTFALL */
  const totalFootfall =
    DAY1_BASE_FOOTFALL +
    DAY2_BASE_FOOTFALL +
    day3Footfall +
    NITI_TANSCST_COUNT-15 // ✅ included

  /* 🎉 MILESTONE CELEBRATION */
  useEffect(() => {
    const prev = prevTotalRef.current
    const current = totalFootfall

    const isMilestone =
      current === 100 ||
      current === 500 ||
      current === 1000 ||
      (current > 1000 && current % 500 === 0)

    if (current !== prev && isMilestone) {
      setShowConfetti(true)
      setMilestoneText(`🎉 ${current} VISITORS REACHED!`)

      setTimeout(() => {
        setShowConfetti(false)
        setMilestoneText('')
      }, 12000)
    }

    prevTotalRef.current = current
  }, [totalFootfall])

  return (
    <div className="dashboard-container">

      {/* 🎉 CONFETTI */}
      {showConfetti && (
        <div className="confetti-overlay">
          {Array.from({ length: 140 }).map((_, i) => (
            <span key={i} className="confetti-piece" />
          ))}
        </div>
      )}

      {/* ✨ MILESTONE */}
      {milestoneText && (
        <div className="milestone-overlay">
          {milestoneText}
        </div>
      )}

      {/* 🔰 LOGOS */}
      <div className="logo-row">
        {[logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8].map(
          (logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`logo-${idx + 1}`}
              className={idx === 4 ? 'logo-small' : ''}
            />
          )
        )}
      </div>

      <h1 className="dashboard-title">
        ANOKHA TECHFAIR & EXHIBITIONS 2026
      </h1>

      {/* 🔢 FOOTFALL STRIP */}
      <div className="total-footfall">
        <span>DAY 1 FOOTFALL : <span className="total-footfall-value">{day1Footfall}</span></span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span>DAY 2 FOOTFALL : <span className="total-footfall-value">{day2Footfall}</span></span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span>DAY 3 FOOTFALL : <span className="total-footfall-value">{day3Footfall}</span></span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span>
          TOTAL FOOTFALL :
          <span className={`total-footfall-value ${milestoneText ? 'glow' : ''}`}>
            {totalFootfall}
          </span>
        </span>
      </div>

      <div className="accent-divider" />

      {/* 📊 COUNTERS */}
      <div className="dashboard-grid compact">

        <CounterCard label="Amrita Students" value={counts.amritaStudents ?? 0} />
        <CounterCard label="Amrita Faculty" value={counts.amritaFaculty ?? 0} />
        <CounterCard label="Other College Students" value={counts.otherCollegeStudents ?? 0} />
        <CounterCard label="Other College Faculty" value={counts.otherCollegeFaculty ?? 0} />

        <CounterCard label="School Students" value={counts.schoolStudents ?? 0} />
        <CounterCard label="Staff & Others" value={counts.staffOthers ?? 0} />
        <CounterCard label="CEO" value={counts.ceo ?? 0} />
        <CounterCard label="Guest" value={counts.guest ?? 0} />

        <div style={{ gridColumn: '2 / span 2' }}>
          <CounterCard
            label="NITI Aayog & TANSCST Delegates"
            value={NITI_TANSCST_COUNT}
          />
        </div>

      </div>

      {/* 🌟 GREETING */}
      <div className="dashboard-greeting">
        Welcoming innovators, leaders, and delegates to Anokha Techfair & Exhibitions 2026.
      </div>

      <footer className="dashboard-footer">
        © 2026 Anokha & Institution’s Innovation Council (IIC), Amrita Coimbatore
      </footer>

    </div>
  )
}

export default Dashboard