var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let socket = null;
function addMessageToChat(message, username, isSelf) {
    const chatBox = document.getElementById("chat");
    if (!chatBox)
        return;
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
function sendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const messageInput = document.getElementById("msgInput");
        const message = messageInput.value.trim();
        const username = window.username;
        if (!message || !username)
            return;
        messageInput.value = "";
        if (socket) {
            socket.emit("send_message", { username, message });
        }
        addMessageToChat(message, username, true);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    window.sendMessage = sendMessage;
    if (typeof io !== "undefined") {
        socket = io();
    }
    else {
        console.error("Socket.io library is not loaded.");
    }
    if (socket) {
        socket.on("receive_message", (data) => {
            addMessageToChat(data.message, data.username, false);
        });
    }
});
export {};
