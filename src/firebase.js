// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTI33P_g_LQiloSo4dOh_zH1I3NetytCw",
  authDomain: "fyp-jp-2ed7b.firebaseapp.com",
  projectId: "fyp-jp-2ed7b",
  storageBucket: "fyp-jp-2ed7b.appspot.com",
  //   messagingSenderId: "XXXXXXX",
  //   appId: "XXXXXXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
