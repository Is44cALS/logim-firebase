import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAB0t3hUxpZtCPTEmmbVEfHGWqfd4xqgNU",
    authDomain: "correio-do-amor-48a9f.firebaseapp.com",
    projectId: "correio-do-amor-48a9f",
    storageBucket: "correio-do-amor-48a9f.firebasestorage.app",
    messagingSenderId: "400456218648",
    appId: "1:400456218648:web:edec8e20ba12436a792b6d",
    measurementId: "G-62RY0QRZCG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function updateUserProfile(user) {
    let userName = user.displayName;
    let userString = userName.split(" ");
    let firstName = userString[0];
    const userProfilePicture = user.photoURL;

    document.getElementById("userName").textContent = `Olá ${firstName}`;
    document.getElementById("userProfilePicture").src = userProfilePicture;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
    } else {
        alert("Create Account & Login");
    }
});
