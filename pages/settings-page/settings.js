import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { getFirestore, getDoc, doc, setDoc, collection, addDoc, query, onSnapshot } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-storage.js";

// Initialize Firebase Storage



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGThZKQT0CWcB-C5_uHh-gCpUtm8HLceI",
    authDomain: "finalitws-1100.firebaseapp.com",
    projectId: "finalitws-1100",
    storageBucket: "finalitws-1100.appspot.com",
    messagingSenderId: "1060680166759",
    appId: "1:1060680166759:web:e00de69fb95d50931093c2"
}; 
const fileInput = document.getElementById("file");
const submitBtn = document.getElementById("submit");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

// Initialize Firestore
const db = getFirestore();

auth.onAuthStateChanged(user => {
    if (user) {
        getDoc(doc(db, "userInfo", user.uid)).then((doc) => {
            if (doc.exists()) {
                var downloadURL = doc.data().profilePic;
                document.getElementById("profilePic").src = downloadURL;
            }
        })
        const file = fileInput.files[0];
        const storageRef = ref(getStorage(), `profile-pics/${user.uid}`);
        submitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log("File uploaded:", snapshot);
                getDownloadURL(storageRef).then((downloadURL) => {
                    console.log("File download URL:", downloadURL);
                    const userDocRef = doc(collection(db, "userInfo"), user.uid);
                    setDoc(userDocRef, { profilePic: downloadURL }, { merge: true }).then(() => {
                        alert("Profile picture updated successfully");
                    })
                });
            });
        })
        document.getElementById("logoutButton").addEventListener("click", (event) => {
            signOut(auth).then(() => {
                console.log("User signed out successfully");
              }).catch((error) => {
                console.log(error.message);
              });
        })
    }
})