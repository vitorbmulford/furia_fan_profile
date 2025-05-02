import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDhe2ey6YTOf4OWWq1izNmyBKFY-alA6gg",
  authDomain: "furia-fan-profiler.firebaseapp.com",
  projectId: "furia-fan-profiler",
  storageBucket: "furia-fan-profiler.firebasestorage.app",
  messagingSenderId: "13930129490",
  appId: "1:13930129490:web:6c37a5d4dc2e3f72c5578b",
  measurementId: "G-J3QLPJPG37",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
