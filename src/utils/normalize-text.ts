export default function normalizeText(text: string): string {
  // Remove specified punctuation
  text = text.replace(/[,.\`'"!?]/g, "");
  // Normalize spaces
  text = text.replace(/\s+/g, " ").trim();
  // Convert to lowercase for case-insensitive comparison
  return text.toLowerCase();
}
