import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBJMYDFAr8MdmAHXPK14nlpw4hWnulI-2Q",
  authDomain: "qr-entry-analytics.firebaseapp.com",
  projectId: "qr-entry-analytics",
  storageBucket: "qr-entry-analytics.firebasestorage.app",
  messagingSenderId: "1061501301060",
  appId: "1:1061501301060:web:2eaa7891795d312bfaa711"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
