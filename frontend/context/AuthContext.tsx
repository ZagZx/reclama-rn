// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  autenticado: boolean;
  usuario: Usuario | null;
  checkAuth: () => Promise<void>;
  setAuthState: (autenticado: boolean, usuario: Usuario | null) => void;
  clearAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  
  // Função para verificar autenticação no servidor
  const checkAuth = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const response = await fetch(`${apiUrl}/api/me`, {
        credentials: 'include' as RequestCredentials, // Para enviar cookies se usar httpOnly
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.autenticado) {
          setAutenticado(true);
          setUsuario(data.usuario);
          // localStorage.setItem('token', data.token || localStorage.getItem('token') || '');
        } else {
          setAutenticado(false);
          setUsuario(null);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setAutenticado(false);
      setUsuario(null);
    }
  };

  // Verificar autenticação na inicialização
  useEffect(() => {
    checkAuth();
  }, []);

  const setAuthState = (autenticado: boolean, usuario: Usuario | null) => {
    setAutenticado(autenticado);
    setUsuario(usuario);
  };

  const clearAuthState = () => {
    setAutenticado(false);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{
      autenticado,
      usuario,
      checkAuth,
      setAuthState,
      clearAuthState
    }}>
      {children}
    </AuthContext.Provider>
  );
};