'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Reclamacao {
  id: number;
  titulo: string;
  descricao: string;
  cidade: string;
  status: 'pendente' | 'resolvida' | 'contestada';
  data_criacao: string;
  autor: {
    username: string;
  };
}

export default function Reclamacoes() {
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'pendentes' | 'resolvidas' | 'contestadas'>('todas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarReclamacoes();
  }, [filtro]);

  const carregarReclamacoes = async () => {
    try {
      setLoading(true);
      setError('');
      
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      let rota = '';
      
      if (filtro === 'todas') {
        rota = '/api/reclamacoes';
      } else if (filtro === 'pendentes') {
        rota = '/api/reclamacoes/status/pendentes';
      } else if (filtro === 'resolvidas') {
        rota = '/api/reclamacoes/status/resolvidas';
      } else if (filtro === 'contestadas') {
        rota = '/api/reclamacoes/status/contestadas';
      }
      
      const url = `${apiUrl}${rota}`;

      const response = await fetch(url, {
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setReclamacoes(data.reclamacoes || []);
      } else {
        setError(data.message || 'Erro ao carregar reclamações');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolvida':
        return 'bg-green-100 text-green-800';
      case 'contestada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reclamações</h1>
          <Link
            href="/reclamacao/nova"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Nova Reclamação
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['todas', 'pendentes', 'resolvidas', 'contestadas'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-lg transition ${
                filtro === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Mensagens */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando reclamações...</p>
          </div>
        )}

        {/* Lista de Reclamações */}
        {!loading && reclamacoes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">Nenhuma reclamação encontrada</p>
            <Link
              href="/reclamacao/nova"
              className="text-blue-600 hover:underline"
            >
              Criar uma nova reclamação
            </Link>
          </div>
        )}

        {!loading && reclamacoes.length > 0 && (
          <div className="grid gap-4">
            {reclamacoes.map((rec) => (
              <Link
                key={rec.id}
                href={`/reclamacao/${rec.id}`}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {rec.titulo}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {rec.descricao.substring(0, 150)}
                      {rec.descricao.length > 150 ? '...' : ''}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ml-4 ${getStatusColor(rec.status)}`}>
                    {rec.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex gap-4">
                    <span>📍 {rec.cidade}</span>
                    <span>👤 {rec.autor?.username}</span>
                  </div>
                  <span>{formatarData(rec.data_criacao)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
