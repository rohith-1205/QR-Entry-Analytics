import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebaseConfig'
import {
  incrementCounter,
  incrementTotalFootfallAndGetValue
} from './counters'
import { CATEGORY_COUNTER_MAP } from '../utils/categoryMap'
import { getTodayDate } from '../utils/dateUtils'

export async function createEntry({
  category,
  name = null,
  idCode = null,
  otherCollegeQrCode = null,
  source
}) {
  // 🔢 Get next footfall number
  const footfallCount = await incrementTotalFootfallAndGetValue()

  // 📝 Create entry
  await addDoc(collection(db, 'entries'), {
    footfallCount,          // ✅ NEW FIELD
    category,
    name,
    idCode,
    otherCollegeQrCode,
    source,
    date: getTodayDate(),
    timestamp: serverTimestamp()
  })

  // 📊 Increment category counter
  const counterKey = CATEGORY_COUNTER_MAP[category]
  if (!counterKey) {
    throw new Error('Invalid category mapping')
  }

  await incrementCounter(counterKey)
}
