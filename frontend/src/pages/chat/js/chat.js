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

    document.querySelector(".login__input").value = `${userName}`;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
    } else {
        localStorage.removeItem("userProfileData")
        alert("Create Account & Login");
    }
});


// login elements
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

// chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold",
    "lightcoral",
    "mediumseagreen",
    "mediumslateblue",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "olive",
    "orange",
    "orangered",
    "palevioletred",
    "peru",
    "plum",
    "powderblue",
    "royalblue"
]

const user = { id: "", name: "", color: "" }

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message--self")
    div.innerHTML = content

    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message--other")

    span.classList.add("message--sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data)

    const message =
        userId == user.id
            ? createMessageSelfElement(content)
            : createMessageOtherElement(content, userName, userColor)

    chatMessages.appendChild(message)

    scrollScreen()
}

let websocket;

const handleLogin = (event) => {
    event.preventDefault()

    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none"
    chat.style.display = "flex"
    
    websocket = new WebSocket("wss://backend-correio-do-amor.onrender.com");
    websocket.onmessage = processMessage
}

const sendMessage = (event) => {
    event.preventDefault();

    if (websocket.readyState === WebSocket.OPEN) {
        const message = {
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: chatInput.value,
        };

        websocket.send(JSON.stringify(message));
        chatInput.value = "";
    } else {
        alert("Conexão WebSocket não está aberta. Tente novamente mais tarde.");
    }
};

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)