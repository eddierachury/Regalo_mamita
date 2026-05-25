const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const resolveMediaUrl = (p='') => p.startsWith('/static') ? `${base}${p}` : p;
export async function fetchMuseum(){ const r=await fetch(`${base}/api/museum`); if(!r.ok) throw new Error('No se pudo cargar'); return r.json(); }
export { base as apiBaseUrl };
