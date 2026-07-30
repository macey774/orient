import { storage } from './storage.js';
import { initChat, renderMessages } from './chat.js';
import { initForm, initInscriptionDate } from './form.js';

// ===== ÉTAT GLOBAL =====
const AppState = {
  current: 'presentation',
  history: ['presentation']
};

// ===== UTILITAIRES =====
export function showToast(message, duration = 2000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.classList.remove('hidden');
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) container.classList.add('hidden');
    }, 300);
  }, duration);
}

export function switchTo(screen) {
  if (screen === AppState.current) return;
  AppState.history.push(screen);
  AppState.current = screen;
  updateUI(screen);
}

function goBack() {
  if (AppState.history.length > 1) {
    AppState.history.pop();
    const previous = AppState.history[AppState.history.length - 1];
    AppState.current = previous;
    updateUI(previous);
  }
}

function updateUI(screen) {
  const presentation = document.getElementById('orientiug-presentation');
  const chatFull = document.getElementById('orientiug-chat-fullscreen');
  const inscription = document.getElementById('inscription-section');
  const backBtn = document.getElementById('back-button');
  const headerIcon = document.getElementById('header-icon');
  const headerTitle = document.getElementById('header-title');
  const hubActions = document.getElementById('hub-actions');
  const chatActions = document.getElementById('chat-actions');
  const inscriptionActions = document.getElementById('inscription-actions');

  // Tout masquer
  presentation.classList.add('hidden');
  chatFull.classList.add('hidden');
  inscription.classList.add('hidden');
  backBtn.classList.add('hidden');
  hubActions.classList.add('hidden');
  chatActions.classList.add('hidden');
  inscriptionActions.classList.add('hidden');
  document.body.classList.remove('chat-active');

  switch (screen) {
    case 'presentation':
      presentation.classList.remove('hidden');
      headerIcon.className = 'fas fa-compass';
      headerTitle.textContent = 'OrientIUG';
      hubActions.classList.remove('hidden');
      break;
    case 'chat':
      chatFull.classList.remove('hidden');
      headerIcon.className = 'fas fa-compass';
      headerTitle.textContent = 'OrientIUG';
      backBtn.classList.remove('hidden');
      chatActions.classList.remove('hidden');
      document.body.classList.add('chat-active');
      renderMessages();
      break;
    case 'inscription':
      inscription.classList.remove('hidden');
      headerIcon.className = 'fas fa-pen-alt';
      headerTitle.textContent = 'Fiche d\'inscription';
      backBtn.classList.remove('hidden');
      inscriptionActions.classList.remove('hidden');
      initInscriptionDate();
      break;
  }
}

// ===== SPLASH SCREEN =====
function initSplash() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;
  // Le splash disparaît après 2 secondes
  setTimeout(() => {
    splash.classList.add('hide');
    splash.addEventListener('transitionend', () => {
      splash.remove();
    }, { once: true });
  }, 2000);
}

// ===== INITIALISATION GÉNÉRALE =====
document.addEventListener('DOMContentLoaded', () => {
  // Splash
  initSplash();

  // Navigation
  document.getElementById('go-to-chat')?.addEventListener('click', () => switchTo('chat'));
  document.getElementById('back-button')?.addEventListener('click', goBack);
  document.getElementById('header-logo')?.addEventListener('click', () => switchTo('presentation'));
  // Bouton inscription depuis le menu trois points (géré dans chat.js, mais on peut aussi le faire ici)
  // On écoute aussi le clic sur "menu-register" (dans chat.js) qui appelle switchTo('inscription')

  // Thème
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    document.querySelectorAll('#themeToggle i, #mobileThemeToggle i').forEach(icon => {
      icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    });
  }
  themeToggle?.addEventListener('click', toggleTheme);
  mobileThemeToggle?.addEventListener('click', toggleTheme);

  // Langue (simulé)
  document.querySelectorAll('#langToggle, #mobileLangToggle').forEach(btn => {
    btn.addEventListener('click', () => showToast('Changement de langue (simulé) - Passage en anglais'));
  });

  // Connexion (simulé)
  const loginModal = document.getElementById('loginModal');
  document.querySelectorAll('#loginBtn, #loginBtnChat, #mobileLogin').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.classList.remove('hidden');
    });
  });
  document.getElementById('loginClose')?.addEventListener('click', () => loginModal.classList.add('hidden'));
  document.getElementById('loginSubmit')?.addEventListener('click', () => {
    showToast('Connexion simulée !');
    loginModal.classList.add('hidden');
  });

  // Menu mobile
  const menuToggle = document.getElementById('menuToggle');
  const menuToggleChat = document.getElementById('menuToggleChat');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  menuToggleChat?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  document.addEventListener('click', (e) => {
    if (!menuToggle?.contains(e.target) && !menuToggleChat?.contains(e.target) && !mobileMenu?.contains(e.target)) {
      mobileMenu?.classList.add('hidden');
    }
  });

  // Accessibilité
  document.getElementById('accessibilityLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('accessibilityPanel')?.classList.toggle('hidden');
  });
  document.getElementById('closeAccessibility')?.addEventListener('click', () => {
    document.getElementById('accessibilityPanel')?.classList.add('hidden');
  });
  document.getElementById('fontSize')?.addEventListener('change', (e) => {
    document.body.style.fontSize = e.target.value === 'normal' ? '' : e.target.value === 'large' ? '1.2rem' : '1.4rem';
  });
  document.getElementById('contrast')?.addEventListener('change', (e) => {
    document.body.classList.toggle('contrast-high', e.target.value === 'high');
  });

  // Modules
  initChat();
  initForm();

  // Démarrer sur la présentation
  switchTo('presentation');
});
