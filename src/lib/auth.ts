export type UserRole = 'admin' | 'organization' | 'user'

export interface User {
  email: string
  role: UserRole
  name: string
}

// Mock user database
const users: User[] = [
  {
    email: 'admin@gmail.com',
    role: 'admin',
    name: 'Admin User'
  },
  {
    email: 'organizationadmin@gmail.com',
    role: 'organization',
    name: 'Organization Admin'
  },
  {
    email: 'generaluser@gmail.com',
    role: 'user',
    name: 'General User'
  }
]

// Mock authentication function
export const authenticate = async (email: string, password: string): Promise<{ user: User | null; error?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Check if password is correct (in a real app, this would be hashed)
  if (password !== 'password@123') {
    return { user: null, error: 'Invalid email or password' }
  }

  // Find user by email
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  
  if (!user) {
    return { user: null, error: 'User not found' }
  }

  return { user }
}

// Get user role for protected routes
export const getUserRole = (): UserRole | null => {
  if (typeof window === 'undefined') return null
  const user = getCurrentUser()
  return user?.role || null
}

// Get current user
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

// Set user session
export const setUserSession = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

// Clear user session
export const clearUserSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}

// Get auth token (if using JWT)
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

// Set auth token (if using JWT)
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
  }
}

// Clear auth token (if using JWT)
export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
}

// Complete logout
export const logout = () => {
  clearUserSession()
  clearAuthToken()
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/sign-in'
  }
}
