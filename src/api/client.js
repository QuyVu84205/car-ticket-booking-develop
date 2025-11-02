const BASE_URL = "http://localhost:8081";

// Function to get JWT token from localStorage
const getToken = () => localStorage.getItem('token');

export async function api(path, { method = "GET", body, headers = {} } = {}) {
  // Get token from localStorage
  const token = getToken();
  
  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${BASE_URL}${path}`;
  console.log('Calling API:', url);
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...headers
      },
      credentials: "include",
      mode: "cors",
      body: body ? JSON.stringify(body) : undefined,
    });
    console.log('Response status:', res.status);
    const data = await res.json().catch(() => {
      console.log('Failed to parse JSON response');
      return {};
    });
    if (!res.ok) {
      console.error('API error:', data);
      throw { status: res.status, data };
    }
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}