import { storage } from './storage.js';
import { initChat, renderMessages } from './chat.js';
import { initForm, initInscriptionDate } from './form.js';

const AppState = { current: 'presentation', history: ['presentation'] };

export function showToast(message, duration = 2000) { /* ... */ }

export function switchTo(screen) {
  if (screen === AppState.current) return;
  AppState.history.push(screen);
  AppState.current = screen;
  updateUI(screen);
}

function goBack() { /* gestion pile d'historique */ }

function updateUI(screen) {
  // Affiche/cache les sections : présentation, chat, inscription
  // Affiche/masque les boutons d'action correspondants
}

document.addEventListener('DOMContentLoaded', () => {
  // Splash
  // Navigation : boutons "go-to-chat", "back-button", logo
  // Thème, langue, connexion, menu mobile, accessibilité
  initChat();
  initForm();
  switchTo('presentation');
});
