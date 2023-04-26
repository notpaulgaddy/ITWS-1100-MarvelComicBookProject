const addFavorite = document.getElementById("addToFavs");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { getFirestore, getDoc, doc, setDoc, collection, addDoc, query, onSnapshot} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";


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
const comicId = new URLSearchParams(window.location.search).get("id");
auth.onAuthStateChanged(user => {
  if (user) {
    addFavorite.addEventListener("click", async (e) => {
      const publicKey = "a8760f5c8e45774a36a2b0f29bc9d90c";
      const privateKey = "4b02f4d73ddaee831368e1cd4cfdb9f9e8868e4a";

      try {
        const timestamp = new Date().getTime().toString();
        const hash = md5(timestamp + privateKey + publicKey);
        const apiUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

        const response = await fetch(apiUrl);
        const json = await response.json();

        if (json.data && json.data.results && json.data.results.length > 0) {
          const comic = json.data.results[0];
          const thumb =
            comic.thumbnail.path + "/portrait_xlarge." + comic.thumbnail.extension;
          const theDate = comic.dates[0].date;
          const displayDate = theDate.slice(0, 10);

          // Get the reference to the document
          const userDocRef = doc(db, "userInfo", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          // Get the current liked comics
          const likedComics = userDocSnap.data().likedComics || {} || null;

          // Update the likedComics field with the new comic data
          const updatedLikedComics = {
            ...likedComics,
            [comicId]: {
              imageLink: thumb,
              title: comic.title,
              releaseDate: displayDate,
              isbn: comic.issueNumber,
              price: comic.prices[0].price,
              pages: comic.pageCount,
              description: comic.description,
            },
          };

          // Save the updated likedComics to the document
          await setDoc(userDocRef, { likedComics: updatedLikedComics }, { merge: true });
          console.log("Liked comics updated successfully!");
        } else {
          console.log("Comic not found.");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    });
    
    const commentInput = document.getElementById("comment");
const postCommentBtn = document.getElementById("postComm");

// When the user clicks the "Post Comment" button
postCommentBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const commentText = commentInput.value.trim();
  if (commentText.length === 0) {
    return;
  }

  // Create a new comment object
  const newComment = {
    text: commentText
  };
  const commentRef = collection(db, `comicReviews/${comicId}/comments`);
  addDoc(commentRef, newComment).then(() => {
    alert("Comment has been posted")
  })
});
    
const commentsList = document.getElementById("comments-list");

// Create a query for the comments subcollection of the current comicId
const commentsQuery = query(collection(db, `comicReviews/${comicId}/comments`));

// Listen for real-time updates to the comments list
onSnapshot(commentsQuery, (snapshot) => {
  // Clear the existing comments from the list
  commentsList.innerHTML = "";

  // Loop through the comments and display them in the list
  snapshot.forEach((doc) => {
    const comment = doc.data();
    // const commentItem = document.createElement("li");
    // commentItem.textContent = comment.text;
    // commentsList.appendChild(commentItem);
    document.getElementById("comments-list").innerHTML += `
    <div class="comment">
		<img src="${comment.profilePic}" alt="Profile Picture" class="profile-pic">
		<div class="comment-content">
			<div class="username">@${comment.username}</div>
			<div class="comment-text">${comment.text}</div>
		</div>
	</div>
    `
  });

  // If there are no comments, display a message
  if (snapshot.size === 0) {
    const noCommentsItem = document.createElement("li");
    noCommentsItem.textContent = "No comments yet";
    commentsList.appendChild(noCommentsItem);
  }
});

    
  }
});
