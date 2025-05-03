const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-render-app.onrender.com/api' // Replace with your actual Render domain
  : '/api';

export async function fetchProperties() {
  const response = await fetch(`${API_URL}/properties`);
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
}

// Update other API functions similarly