import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBmWHXKk9lBtYxGR3_wFHB3nXj5nqO-k8M",
  authDomain: "datn-wd47-default-rtdb.firebaseapp.com",
  databaseURL: "https://datn-wd47-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "datn-wd47",
  storageBucket: "datn-wd47.appspot.com",
  messagingSenderId: "654661762095",
  appId: "1:654661762095:web:c1f69c9469c4e478d2c19c",
  measurementId: "G-QWDWP3VXLE"
};

let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { database, app };