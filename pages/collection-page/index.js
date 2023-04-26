import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { collection, doc, getDoc, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCGThZKQT0CWcB-C5_uHh-gCpUtm8HLceI",
    authDomain: "finalitws-1100.firebaseapp.com",
    projectId: "finalitws-1100",
    storageBucket: "finalitws-1100.appspot.com",
    messagingSenderId: "1060680166759",
    appId: "1:1060680166759:web:e00de69fb95d50931093c2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

auth.onAuthStateChanged((user) => {
  if (user) {
    const userRef = doc(db, "userInfo", user.uid);

    getDoc(userRef).then((doc) => {
      const likedComics = doc.data().likedComics;

      Object.entries(likedComics).forEach(([comicId, comic]) => {
        const comicDiv = document.createElement('div');
        comicDiv.className = 'comic';

        const title = document.createElement('h2');
        title.innerText = comic.title;
        comicDiv.appendChild(title);

        const image = document.createElement('img');
        image.src = comic.imageLink;
        comicDiv.appendChild(image);

        const description = document.createElement('p');
        description.innerText = comic.description;
        comicDiv.appendChild(description);

        const pages = document.createElement('p');
        pages.innerText = `Pages: ${comic.pages}`;
        comicDiv.appendChild(pages);

        const price = document.createElement('p');
        price.innerText = `Price: ${comic.price}`;
        comicDiv.appendChild(price);

        document.getElementById('comics-container').appendChild(comicDiv);
      });
    });
  }
});
