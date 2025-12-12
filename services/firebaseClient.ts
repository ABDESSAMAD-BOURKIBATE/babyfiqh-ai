import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase web configuration provided for Babyfiqh AI
const firebaseConfig = {
  apiKey: 'AIzaSyCs1QpDgwayr1S2UdZ8zDKdqTC7_Ag1gBM',
  authDomain: 'babyfiqh-ai.firebaseapp.com',
  projectId: 'babyfiqh-ai',
  storageBucket: 'babyfiqh-ai.firebasestorage.app',
  messagingSenderId: '531338703611',
  appId: '1:531338703611:web:6a83622f678e2dc6f9765e',
  measurementId: 'G-JN6XBZB4LY'
};

// Ensure we initialize the app only once (safe for hot-reload)
export const initFirebaseApp = () => {
  if (typeof window === 'undefined') return null;
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

export const getFirebaseAuth = () => {
  const app = initFirebaseApp();
  return app ? getAuth(app) : null;
};

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const initFirebaseAnalytics = async () => {
  if (typeof window === 'undefined') return null;
  try {
    const supported = await isSupported();
    if (!supported) return null;
    const app = initFirebaseApp();
    return app ? getAnalytics(app) : null;
  } catch (err) {
    console.warn('Analytics not initialized', err);
    return null;
  }
};
