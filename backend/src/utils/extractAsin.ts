// Utility to extract ASIN from Amazon product URL
export function extractAsinFromUrl(url: string): string | null {
  // Amazon ASINs are 10 characters, usually after '/dp/' or '/gp/product/'
  const dpMatch = url.match(/\/dp\/([A-Z0-9]{10})/i);
  if (dpMatch) return dpMatch[1];
  const gpMatch = url.match(/\/gp\/product\/([A-Z0-9]{10})/i);
  if (gpMatch) return gpMatch[1];
  // Fallback: try to find ASIN in query string or other patterns
  const genericMatch = url.match(/([A-Z0-9]{10})/i);
  return genericMatch ? genericMatch[1] : null;
}
