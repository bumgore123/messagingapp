// Firebase 설정 정보
const firebaseConfig = {
    apiKey: "AIzaSyAi1gCQuw2Hn7EltdwLiEBfZdh4pI-B9R4",
    authDomain: "simple-messaging-app-d60d5.firebaseapp.com",
    databaseURL: "https://simple-messaging-app-d60d5-default-rtdb.firebaseio.com",
    projectId: "simple-messaging-app-d60d5",
    storageBucket: "simple-messaging-app-d60d5.firebasestorage.app",
    messagingSenderId: "838083703261",
    appId: "1:838083703261:web:33dd1ad6606fd7ec3c8634"
};

// Firebase 메세지 저장소 이름
const FIREBASE_DB_REF = "messages"

const githubProvider = new firebase.auth.GithubAuthProvider();

// Firebase 사용준비 완료
firebase.initializeApp(firebaseConfig);

// Firebase 의 authentication 모듈 (제품) 사용
const auth = firebase.auth();
// Firebase 의 realtime database 모듈 (제품) 사용
const database = firebase.database();

let messagesRef = null;

// HTML 요소들 갖고오기
const HTML_EMAIL = document.getElementById("emailInput")
const HTML_PASSWORD = document.getElementById("passwordInput")
const HTML_LOGIN_BTN = document.getElementById("loginBtn")
const HTML_REGISTER_BTN = document.getElementById("registerBtn")
const HTML_LOGIN_BOX = document.getElementById("loginBox")
const HTML_CHAT_BOX = document.getElementById("chatBox")
const USER_EMAIL = document.getElementById("userEmail")
const HTML_GUEST_BTN = document.getElementById("guestBtn")
const HTML_LOGOUT_BTN = document.getElementById("logoutBtn")
const HTML_SEND_BTN = document.getElementById("sendBtn")
const HTML_MESSAGE_INPUT = document.getElementById("messageInput")
const HTML_MESSAGES_AREA = document.getElementById("messages")
const HTML_GITHUB_LOGIN_BTN = document.getElementById("loginByGithubBTN")

// 회원가입/로그인 중 에러가 일어났을때 실행할 함수
function handleError(error) {
    // error = Object (특성... message)
    alert(error.message)
}

// 로그인 버튼을 눌렀을때 실행할 함수
function loginProcess() {
    const userEmail = HTML_EMAIL.value
    const userPassword = HTML_PASSWORD.value

    auth.signInWithEmailAndPassword(userEmail, userPassword).catch(handleError)
}

function githubLoginProcess() {
    auth.signInWithPopup(githubProvider).catch(handleError);
    
}



// 회원가입 버튼을 눌렀을때 실행할 함수
function registerProcess() {
    const userEmail = HTML_EMAIL.value
    const userPassword = HTML_PASSWORD.value

    auth.createUserWithEmailAndPassword(userEmail, userPassword).catch(handleError)
}

function guestProcess() {
    auth.signInAnonymously().catch(handleError)
}

function logoutProcess() {
    if (messagesRef) {
        messagesRef.off('child_added');
        messagesRef = null;
    }
    HTML_MESSAGES_AREA.innerHTML = '';
    auth.signOut();
}

// 유저의 로그인 상태가 바꼈을때 실행할 함수
function handleAuthChanged(user) {

    if (user) {
        console.log("user", user)
        // 로그인된 상태
        HTML_CHAT_BOX.style.display = "block"
        HTML_LOGIN_BOX.style.display = "none"

        if (user.isAnonymous === true) {
            // 익명 로그인
            USER_EMAIL.innerText = "Guest User"
        } else if (user.providerId === "github.com") {
                   USER_EMAIL.EMAIL.innerText = user.constructor.name
        }
        else {
            // 이메일 로그인
            USER_EMAIL.innerText = user.email
        }

        load_messages()
    } else {
        // 로그아웃된 상태
        HTML_CHAT_BOX.style.display = "none"
        HTML_LOGIN_BOX.style.display = "block"
    }
}

function emailToName(email) {

    let index = 0;
    while (email[index] != "@") {
        index += 1
    }
    return email.slice(0, index)
}

function sendMessage() {
    // 유저가 입력창에 쓴 값을 user_message 에 저장
    const user_message_text = HTML_MESSAGE_INPUT.value.trim()
    if (user_message_text !== "") {
        // 서버에 저장해야될 정보: 1. 메세지 값 2. 메세지 시각 3. 메세지를 누가 썼는지

        let user_name = ""
        if (auth.currentUser.email === null) {
            user_name = "Anonymous User"
        } else if (user.providerId === "github.com") {
        user_name = "user.constructor.name"
        }
        else {
            user_name = emailToName(auth.currentUser.email)
        }


        const message_object = {
            value: user_message_text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            user_id: auth.currentUser.uid,
            display_name: user_name
            // 이메일 로그인: brian79891@gmail.com => brian79891
            // 익명 로그인: Anonymous User
        }

        database.ref(FIREBASE_DB_REF).push(message_object)
    } else {
        alert("You need to write something")
    }

    HTML_MESSAGE_INPUT.value = ""
}


function load_messages() {
    if (messagesRef) {
        messagesRef.off('child_added');
    }
    messagesRef = database.ref(FIREBASE_DB_REF);
    messagesRef.on('child_added', process_new_message);
}

function process_new_message(snapshot) {
    const message_data = snapshot.val();
    const HTML_NEW_MESSAGE = document.createElement("div")

    if (message_data.user_id === auth.currentUser.uid) {
        HTML_NEW_MESSAGE.classList.add("message", "sent")
    } else {
        HTML_NEW_MESSAGE.classList.add("message", "received")
    }

    HTML_NEW_MESSAGE.innerHTML = `
        <div>${message_data.value}<div>
        <small>${message_data.display_name}<small>
        <small>${message_data.time}<small>
    `
    HTML_MESSAGES_AREA.appendChild(HTML_NEW_MESSAGE)
}

// 로그인 관련
auth.onAuthStateChanged(handleAuthChanged)

HTML_LOGIN_BTN.addEventListener(`click`, loginProcess)
HTML_REGISTER_BTN.addEventListener(`click`, registerProcess)
HTML_GUEST_BTN.addEventListener(`click`, guestProcess)
HTML_LOGOUT_BTN.addEventListener(`click`, logoutProcess)
HTML_GITHUB_LOGIN_BTN.addEventListener(`click`, githubLoginProcess)
// 채팅창 관련
HTML_SEND_BTN.addEventListener(`click`, sendMessage)

