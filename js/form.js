import { storage } from './storage.js';
import { showToast, switchTo } from './app.js';

export function initForm() {
  document.getElementById('clear-form-btn').addEventListener('click', clearForm);
  document.getElementById('download-form-btn').addEventListener('click', validateAndGeneratePDF);
}

function clearForm() { /* réinitialise et efface les erreurs */ }

export function initInscriptionDate() { /* met la date du jour et l'année académique */ }

function validateForm() { /* valide les champs, retourne true/false */ }

async function validateAndGeneratePDF() {
  if (!validateForm()) {
    showToast('Corrigez les erreurs.');
    return;
  }
  // Récupération données, sauvegarde, envoi Google Sheets, génération PDF...
}
