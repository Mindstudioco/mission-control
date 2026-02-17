import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOs7udKzlXZntlJ1rl13NPWCIsZG81ArU",
  authDomain: "dashboardmindagents.firebaseapp.com",
  projectId: "dashboardmindagents",
  storageBucket: "dashboardmindagents.firebasestorage.app",
  messagingSenderId: "943304496189",
  appId: "1:943304496189:web:e52beb89db861375680654",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
