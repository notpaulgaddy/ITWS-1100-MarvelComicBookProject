const submit = document.querySelector(".btn--form");
var email = document.getElementById("email");
const pword = document.getElementById("verify-password");
var docRef = firebase.firestore();
var auth = firebase.auth();


submit.addEventListener("click", (e) => {
    firebase.auth().createUserWithEmailAndPassword(email.value, pword.value).then((auth) => {
        docRef.collection("userInfo").doc(auth.user.uid).set({
            profilePic:"https://skin-tracker.com/images/fnskins/icon/fortnite-doctor-doom-outfit.png",
            likedComics:{},
            username: ""
        });
        });
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        alert("You have signed up, congratulations");
        window.location.replace = "../../index.html";
    }
  });