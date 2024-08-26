import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyDTVgkFitlKbzyPnMSZHHwHk9fiP1iKvPs",
authDomain: "login-com-firebase-7f3af.firebaseapp.com",
projectId: "login-com-firebase-7f3af",
storageBucket: "login-com-firebase-7f3af.appspot.com",
messagingSenderId: "949263278669",
appId: "1:949263278669:web:2729dd103fb249a0b33204"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


function updateUserProfile(user) {
    const userName = user.displayName
    const userEmail = user.email
    const userProfilePicture = user.photoURL
    console.log(userEmail);
    
    document.getElementById("userName").textContent = `Bem-vindo(a)! ${userName}`
    document.getElementById("userEmail").textContent = `Você está logado com o email: ${userEmail}`
    document.getElementById("userProfilePicture").src = userProfilePicture
}

onAuthStateChanged(auth, user => {
    if(user) {
        updateUserProfile(user)
        // window.location.href = "../logado.html"
    } else {
        alert("Create Account & Login")
    }
})