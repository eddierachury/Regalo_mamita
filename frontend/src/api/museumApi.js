const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || window.location.origin;

export const resolveMediaUrl = (p = '') =>
  p.startsWith('/static') ? `${API_BASE_URL}${p}` : p;

export async function fetchMuseum() {
  const r = await fetch(`${API_BASE_URL}/api/museum`);
  if (!r.ok) throw new Error('No se pudo cargar');
  return r.json();
}

export { API_BASE_URL as apiBaseUrl };
