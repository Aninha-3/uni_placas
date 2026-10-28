import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface Usuario {
  nome: string
  email: string
}

interface AuthContextData {
  usuario: Usuario | null
  isAuthenticated: boolean
  login: (usuario: Usuario) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const salvo = localStorage.getItem('usuario')
    return salvo ? JSON.parse(salvo) : null
  })

  function login(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario))
    setUsuario(usuario)
  }

  function logout() {
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)