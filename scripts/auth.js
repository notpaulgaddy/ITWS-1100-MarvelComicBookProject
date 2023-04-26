import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { getFirestore,getDoc, doc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGThZKQT0CWcB-C5_uHh-gCpUtm8HLceI",
  authDomain: "finalitws-1100.firebaseapp.com",
  projectId: "finalitws-1100",
  storageBucket: "finalitws-1100.appspot.com",
  messagingSenderId: "1060680166759",
  appId: "1:1060680166759:web:e00de69fb95d50931093c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize Firestore
const db = getFirestore();

auth.onAuthStateChanged(user => {
  const navbar = document.getElementById("navbar");
  if (user) {
    getDoc(doc(db, "userInfo", user.uid)).then((doc) => {
      if (doc.exists()) {
          var downloadURL = doc.data().profilePic;
          // User is signed in, update navbar accordingly
          navbar.innerHTML = `<header>
                     <nav class="navbar">
                       <h2 href="../../index.html">Marvel Comics</h2>
                       <ul class="nav-list-authorized">
                         <li><a href="pages/collection-page/index.html" class="nav-link">Collection</a></li>
                         <li><a href="pages/settings-page/index.html" class="nav-link"><img src="${downloadURL}" style="width:25px;height:25px;"</a></li>
                       </ul>
                     </nav>
                  </header>`;
        } 
      })
  }else {
    // User is signed out, update navbar accordingly
    navbar.innerHTML = `
    <header>
               <nav class="navbar">
                 <ul class="nav-list-authorized">
                   <li><a href="pages/log-in-page/index.html" class="nav-link">Login</a></li>
                   <li><a href="pages/sign-up-page/index.html" class="nav-link">Signup</a></li>
                 </ul>
               </nav>
            </header>
`;
  }
});
