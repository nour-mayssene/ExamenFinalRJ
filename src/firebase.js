import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC9PvOLyxyZMUcHqGiZlCgrpaz2NOqsq3U",
  authDomain: "reactexam-9f214.firebaseapp.com",
  projectId: "reactexam-9f214",
  storageBucket: "reactexam-9f214.appspot.com",
  messagingSenderId: "724034941382",
  appId: "1:724034941382:web:1ab4f3c13edc64f65782c7",
  measurementId: "G-GY5FMNL90T"

};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()
const fire = firebase;

export { auth, provider,firebase }
export default db



