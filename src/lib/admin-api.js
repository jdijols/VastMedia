const API = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`)
  }

  return data
}

export const auth = {
  login: (password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),
  verify: () => request('/auth/verify'),
  logout: () => request('/auth/logout', { method: 'POST' }),
}

export const content = {
  get: (section) => request(`/content/${section}`),
  update: (section, data) =>
    request(`/content/${section}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
}

export const media = {
  delete: (url) =>
    request('/media/delete', {
      method: 'POST',
      body: JSON.stringify({ url }),
    }),
}
