import { storage } from './storage.js';
import { getBotResponse } from './bot.js';
import { showToast, switchTo } from './app.js';

let messagesContainer, chatInput, sendBtn;
export function initChat() {
  messagesContainer = document.getElementById('chat-fullscreen-messages');
  chatInput = document.getElementById('chat-fullscreen-input');
  sendBtn = document.getElementById('send-voice-btn');
  // Écouteurs...
}
export function renderMessages() {
  const messages = storage.get('orientiugChatMessages', []);
  messagesContainer.innerHTML = '';
  messages.forEach(msg => {
    // Création bulle, date, action si présente
  });
}
