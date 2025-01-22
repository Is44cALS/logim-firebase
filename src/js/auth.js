import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
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
auth.languageCode = "pt-BR";
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("bttLoginGoogle");

if (googleLogin) {
    googleLogin.addEventListener("click", (e) => {
        e.preventDefault();

        signInWithPopup(auth, provider)
            .then(() => {
                window.location.href = "./src/pages/mural/mural.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
            });
    });
}
