


// TODO 1: Wait for the DOM to be fully loaded
const HTML_MESSAGE = document.getElementById("message")

// TODO 2: Get references to the DOM elements we need
// HINT: We need messageInput, sendButton, and messageArea
const messageInput = document.getElementById("messageInput"); // Your code here
const sendButton = document.getElementById("sendButton");   // Your code here
const messageArea = document.getElementById("messageArea");  // Your code here

// TODO 3: Create an array to store all messages
// HINT: Initialize an empty array
const messages = []


// TODO 4: Implement the createMessage function
// This function should create a message object with:
// - text: the message content
// - time: current time in HH:MM format
// - sender: 'User'
function createMessage(text) {
    // Your code here
    // HINT: Use new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    // to format the time
    return {
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: "User"
    }
}

// TODO 5: Implement the displayMessage function
// This function should:
// - Create a new div element
// - Add 'message' and 'sent' classes to it
// - Set its innerHTML to show the message text and time
// - Append it to the messageArea
function displayMessage(message) {
    // Your code here
    // HINT: Use template literals for innerHTML
    // HINT: Structure should be:
    // <div>message text</div>
    // <small>message time</small>
    const NEW_MESSAGE = document.createElement("div")
    NEW_MESSAGE.classList.add("message", "sent");
    NEW_MESSAGE.innerHTML = `
        <div>${message.text}</div>
        <small>${message.time}</small>
    `
    messageArea.appendChild(NEW_MESSAGE)
}

// TODO 6: Implement the sendMessage function
// This function should:
// - Get input text
// - If text isn't empty:
//   * Create a message object
//   * Add it to messages array
//   * Display it
//   * Clear the input
//   * Scroll to bottom
function sendMessage() {
    // Your code here
    // HINT: Use messageInput.value.trim()
    // HINT: Don't forget to scroll: messageArea.scrollTop = messageArea.scrollHeight
    const messageText = messageInput.value;

    // messageText = "        "

    // messageText 의 스페이스들을 정리/제거
    const cleanText = messageText.trim();

    if (cleanText !== "") {
        const message = createMessage(cleanText)
        messages.push(message)
        displayMessage(message)
        messageInput.value = ""
        messageArea.scrollTop = messageArea.scrollHeight
    } else {
        alert("Empty text")
        messageInput.value = ""
    }
}

function deleteSpace(text) {
    // text = "    hello my name is Beomju    "
    // Loop1       |
    // Loop2                             |

    // result = text[loop1 ~ loop2]
    let start = 0;
    let end = text.length - 1;

    // Loop 1
    while (start <= end && text[start] === ' ') {
        start++;
    }

    while (end >= start && text[end] === ' ') {
        end--;
    }

    return text.slice(start, end + 1);
    // result = "hello my name is Beomju"
}

// TODO 7: Add event listeners
// HINT: We need :
// 1. Click event on send button
sendButton.addEventListener(`click`, () =>
    sendMessage()
)


