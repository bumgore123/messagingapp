// TODO 1: Wait for the DOM to be fully loaded
const HTML_MESSAGE = document.getElementById("message")
document.addEventListener('DOMContentLoaded', () => {
    // TODO 2: Get references to the DOM elements we need
    // HINT: We need messageInput, sendButton, and messageArea
    const messageInput = null; // Your code here
    const sendButton = null;   // Your code here
    const messageArea = null;  // Your code here

    // TODO 3: Create an array to store all messages
    // HINT: Initialize an empty array
    const messages = null; // Your code here

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
            // Add properties here
        };
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
    }

    // TODO 6: Implement the sendMessage function
    // This function should:
    // - Get the trimmed input text
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
    }

    // TODO 7: Add event listeners
    // HINT: We need two:
    // 1. Click event on send button
    // 2. 'Enter' keypress event on input field

    // Your code here
    // HINT: For Enter key: if (e.key === 'Enter') { ... }
});
