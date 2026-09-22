/**
 * Images de démonstration (banque Unsplash) utilisées le temps que de vraies
 * photos de prestations NOHA COIFF soient fournies. À remplacer.
 */
export function unsplash(id: string, width = 1600, quality = 75) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
