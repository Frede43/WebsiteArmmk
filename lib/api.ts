const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` : 'http://localhost:8000/api';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 60, ...options.next }, // Optional ISR caching
    });

    if (!res.ok) {
      // console.error(`API Error: ${res.status} on ${endpoint}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    // console.error(`Fetch Error on ${endpoint}:`, error);
    return null;
  }
}

export async function getEvents() {
  const data = await fetchAPI('/events/');
  return Array.isArray(data) ? data : [];
}

export async function getActivities() {
  const data = await fetchAPI('/activities/');
  return Array.isArray(data) ? data : [];
}

export async function getNews() {
  const data = await fetchAPI('/articles/');
  return Array.isArray(data) ? data : [];
}

export async function getTestimonies() {
  const data = await fetchAPI('/stories/');
  return Array.isArray(data) ? data : [];
}

export async function getStories() {
  const data = await fetchAPI('/stories/');
  return Array.isArray(data) ? data : [];
}

export async function getTeamMembers() {
  const data = await fetchAPI('/team/');
  return Array.isArray(data) ? data : [];
}

export async function getStats() {
  const data = await fetchAPI('/stats/');
  return Array.isArray(data) ? data : [];
}

export async function getHeroSlides() {
  const data = await fetchAPI('/hero-slides/');
  return Array.isArray(data) ? data : [];
}

export async function getCommemorationSection() {
  return await fetchAPI('/commemoration-section/');
}

export async function getHomeCTAActions() {
  const data = await fetchAPI('/cta-actions/');
  return Array.isArray(data) ? data : [];
}

export async function getNavLinks() {
  const data = await fetchAPI('/nav-links/');
  return Array.isArray(data) ? data : [];
}

export function getMediaUrl(path: string | null | undefined) {
  if (!path) return "";
  if (path.startsWith('http')) return path;
  
  // The API_URL is something like http://localhost:8000/api
  // We want the base URL http://localhost:8000
  const baseUrl = API_URL.replace(/\/api$/, '');
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}
