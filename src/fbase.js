import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBlXmk08P69xPaSmE7AKRpec2z82mWsOc",
  authDomain: "nwitter-ef72a.firebaseapp.com",
  projectId: "nwitter-ef72a",
  storageBucket: "nwitter-ef72a.appspot.com",
  messagingSenderId: "91714356572",
  appId: "1:91714356572:web:4ff6b4e70fe03407f0ed99"
};

const app = initializeApp(firebaseConfig);
export default app;
export const authService=getAuth();
export const firebaseInstance=firebase;
export const dbService=getFirestore();
export const storageService=getStorage();