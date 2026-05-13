import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmzebdiAyv5KHWaQ4R-mWNyfM7LRw_yn8",
  authDomain: "mrbeautyland-de7c6.firebaseapp.com",
  projectId: "mrbeautyland-de7c6",
  storageBucket: "mrbeautyland-de7c6.firebasestorage.app",
  messagingSenderId: "135911379479",
  appId: "1:135911379479:web:2df5a4b4a5eefaf4d74252",
  measurementId: "G-7VPG7J36JP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();