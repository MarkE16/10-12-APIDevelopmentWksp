//@ts-ignore
let socket = null;

/**
 * Updates the UI to add a new message to the chat box.
 * @param message The message content.
 * @param username The username of the sender.
 * @param isSelf Whether the message is sent by the current user.
 * @returns
 */
function addMessageToChat(
  message: string,
  username: string,
  isSelf: boolean,
): void {
  const chatBox = document.getElementById("chat");
  if (!chatBox) return;

  const messageElement = document.createElement("div");
  const classNames = ["message"];

  if (isSelf) {
    classNames.push("self");
  }
  messageElement.classList.add(...classNames);
  messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(): Promise<void> {
  const messageInput = document.getElementById("msgInput") as HTMLInputElement;
  const message = messageInput.value.trim();
  const username = window.username;

  if (!message || !username) return;

  // Clear the input field
  messageInput.value = "";

  // Send the message to the server
}

document.addEventListener("DOMContentLoaded", () => {
  window.sendMessage = sendMessage;

  //@ts-ignore
  if (typeof io !== "undefined") {
    //@ts-ignore
    socket = io();
  } else {
    console.error("Socket.io library is not loaded.");
  }

  //@ts-ignore
  if (socket) {
  }
});

// ... Setup content below ...

// This is needed so that Typescript
// is aware of the sendMessage function
// being added to the window object
declare global {
  interface Window {
    sendMessage: () => Promise<void>;
    username: string | null;
  }
}

export {};
