# QR Entry Analytics

A high-performance, real-time event entry management and analytics dashboard built with React, Vite, and Firebase. This application facilitates quick check-ins via QR code/barcode scanning and manual entry, tracks visitor footfall across various customizable categories, and provides a visually appealing, real-time analytics dashboard. 

## 🚀 Features

- **Blazing Fast Environment**: Bootstrapped with Vite and React for instant server start and lightning-fast Hot Module Replacement (HMR).
- **Categorized Check-Ins**: Readily separable entry forms for different administrative or visitor groups.
- **QR Code & Barcode Scanning**: Integrated camera-based scanner (powered by `html5-qrcode`) to instantly scan ID cards, passes, and tickets.
- **Real-Time Analytics Dashboard**: Live updating footfall and category-wise counters powered by Firebase Firestore, complete with milestone celebration animations!
- **Data Export**: Seamlessly view and export collected entry logs into Excel or CSV formats (via `xlsx` and `papaparse`).
- **Responsive UI**: Carefully optimized CSS structures for mobile devices (used by on-the-ground volunteers) and large screens (for central dashboard displays).

## 🛠️ Tech Stack

- **Frontend Core**: React 19, React Router v7
- **Build Tool**: Vite
- **Backend / Database**: Firebase SDK (Firestore Realtime listeners)
- **Utilities Engine**: `html5-qrcode`, `xlsx`, `papaparse`
- **Linting & Code Quality**: ESLint v9

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd qr-entry-analytics
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Firebase Configuration**:
   The project requires a Firebase project for data syncing. Update the configuration inside `src/firebase/firebaseConfig.js` to point to your own Firebase instance:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   To generate a fully optimized production build inside the `dist` folder:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/pages/` - Contains the main application views (General Entry, alternative Entry forms, Dashboard, Export portal).
- `src/components/` - Reusable UI elements such as `BarcodeScanner` and `CounterCard`.
- `src/firebase/` - Firebase initialization and modular helper functions for creating entries and reading live snapshots.
- `src/routes/` - Standardized application routing definitions.
- `src/styles/` - Lightweight vanilla CSS stylesheets providing a rich and dynamic interface.
- `src/utils/` - Shared helper maps and configuration utilities for dropdown options and statuses.

## 🤝 Best Practices

- Maintain categorized entries logic dynamically so it is easy to swap form fields based on new categories.
- Ensure camera permissions and secure connections (`https://`) are active when deploying, as browsers require secure contexts for camera-based QR scanning.
- Use `npm run lint` routinely.

## 📄 License

This project is licensed under the MIT License - feel free to build upon it for your own event requirement!

- ROHITH S
