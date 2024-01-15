import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.API_FIREBASE_KEY,
  authDomain: "thekangae.firebaseapp.com",
  projectId: "thekangae",
  storageBucket: "thekangae.appspot.com",
  messagingSenderId: "34674996023",
  appId: "1:34674996023:web:4077a4f644c674ba6a60b2"
};

export const app = initializeApp(firebaseConfig);