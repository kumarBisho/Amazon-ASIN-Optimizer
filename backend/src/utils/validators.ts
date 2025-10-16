export function validateAsin(asin?: string) {
  if (!asin || typeof asin !== 'string') return false;
  // ASIN is typically 10 alphanumeric chars; accept 10-12
  return /^[A-Za-z0-9]{10,12}$/.test(asin.trim());
}
