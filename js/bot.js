export function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  if (msg.match(/^(bonjour|salut|coucou|hello|hey|yo)/i)) {
    return { text: "Bonjour ! Je suis OrientIUG...", action: null };
  }
  if (msg.includes('inscription') || msg.includes('s\'inscrire')) {
    return { text: "Pour vous inscrire, remplissez la fiche. ", action: { type: 'inscription', label: 'Accéder à la fiche' } };
  }
  if (msg.includes('merci')) {
    return { text: "Avec plaisir !", action: null };
  }
  if (msg.includes('esg')) return { text: "ESG prépare aux métiers de la gestion...", action: null };
  if (msg.includes('ista')) return { text: "ISTA forme aux métiers de l'informatique...", action: null };
  if (msg.includes('isa')) return { text: "ISA est spécialisé en agronomie...", action: null };
  return { text: "Je n'ai pas encore appris cette question.", action: null };
}
