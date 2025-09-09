interface UserData {
  role: 'admin' | 'editor' | 'viewer'
  email: string
  name: string
}

interface UpdateUserData extends UserData {
  id: string
}

export async function createUser(data: UserData) {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).slice(2),
        ...data,
        status: 'pending',
        lastActive: 'Just now'
      })
    }, 1000)
  })
}

export async function updateUser(data: UpdateUserData) {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...data,
        status: 'active',
        lastActive: 'Just now'
      })
    }, 1000)
  })
}
