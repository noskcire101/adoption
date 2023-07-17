
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, connectFirestoreEmulator, initializeFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyANoWX-1DLQQ85GZA-zABcaxmm98UrDOoM",
  authDomain: "webproject-6f2f2.firebaseapp.com",
  projectId: "webproject-6f2f2",
  storageBucket: "webproject-6f2f2.appspot.com",
  messagingSenderId: "497000636842",
  appId: "1:497000636842:web:07faf33e7fccb488320bd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
  ignoreUndefinedProperties: true
});
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

