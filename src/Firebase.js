import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
require('dotenv').config()



const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
export const auth = getAuth(app)
