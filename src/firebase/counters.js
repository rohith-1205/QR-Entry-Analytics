import { doc, updateDoc, increment, onSnapshot, getDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'

/**
 * Increment a specific category counter atomically
 */
export async function incrementCounter(counterKey) {
  const ref = doc(db, 'counts', 'live')

  await updateDoc(ref, {
    [counterKey]: increment(1)
  })
}

/**
 * 🔢 Increment TOTAL footfall and return updated value
 */
export async function incrementTotalFootfallAndGetValue() {
  const ref = doc(db, 'counts', 'live')

  // Increment totalFootfall
  await updateDoc(ref, {
    totalFootfall: increment(1)
  })

  // Read back updated value
  const snap = await getDoc(ref)
  return snap.data()?.totalFootfall ?? 0
}

/**
 * Listen to live counter updates (dashboard)
 */
export function listenToCounters(callback) {
  const ref = doc(db, 'counts', 'live')

  return onSnapshot(ref, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data())
    }
  })
}
