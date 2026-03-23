import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM5imV6A65ingYZDxxuYRsyKGZmYDX6dQ",
  authDomain: "lady-hawks-1fb8c.firebaseapp.com",
  projectId: "lady-hawks-1fb8c",
  storageBucket: "lady-hawks-1fb8c.firebasestorage.app",
  messagingSenderId: "820946918738",
  appId: "1:820946918738:web:9297cf720ee82211382e8b",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);