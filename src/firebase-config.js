import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCNWxj3itmsZb--EtwnexBIRnILEJxYkb8",
    authDomain: "fir-tutorial-c72a2.firebaseapp.com",
    projectId: "fir-tutorial-c72a2",
    storageBucket: "fir-tutorial-c72a2.appspot.com",
    messagingSenderId: "800205386719",
    appId: "1:800205386719:web:ebd8cefc24c0587ffa4a6a",
    measurementId: "G-72ZJTM9KLW"
  };

  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore(app);