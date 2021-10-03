import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDHjlSgMCHIYfNNY_SVXsh4FGhFzi46SmY",
  authDomain: "filmes-noite.firebaseapp.com",
  projectId: "filmes-noite",
  storageBucket: "filmes-noite.appspot.com",
  messagingSenderId: "446332535151",
  appId: "1:446332535151:web:78468f3bf050c319c0e89a"  
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);