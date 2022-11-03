// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Put you credentials here
    apiKey: "AIzaSyB3R6_q63hGltVd9YN10ONvzT-tizeaPUI",
    authDomain: "avaliacao-74c71.firebaseapp.com",
    projectId: "avaliacao-74c71",
    storageBucket: "avaliacao-74c71.appspot.com",
    messagingSenderId: "513127783518",
    appId: "1:513127783518:web:4a800cc65ab1d2578128cf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} nome the title of the Task
 * @param {string} marca the description of the Task
 * @param {string} preco
 * @param {string} quantidade
 */
export const saveTask = (nome,marca,preco,quantidade) =>
  addDoc(collection(db, "tasks"), { nome, marca,preco,quantidade });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));

