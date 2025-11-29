'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Autor {
  id: number;
  username: string;
  email: string;
}

interface Reclamacao {
  id: number;
  titulo: string;
  descricao: string;
  cidade: string;
  status: 'pendente' | 'resolvida' | 'contestada';
  data_criacao: string;
  data_atualizacao: string;
  autor: Autor;
  autor_id: number;
}

export default function DetalheReclamacao({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [reclamacao, setReclamacao] = useState<Reclamacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [acao, setAcao] = useState('');

  useEffect(() => {
    carregarReclamacao();
  }, [params.id]);

  const carregarReclamacao = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/reclamacoes/${params.id}`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setReclamacao(data.reclamacao);
      } else {
        setError(data.message || 'Erro ao carregar reclamação');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcao = async (tipoAcao: 'resolver' | 'contestar' | 'remover'): Promise<void> => {
    try {
      setAcao(tipoAcao);
      setError('');
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

      const metodo = tipoAcao === 'remover' ? 'DELETE' : 'POST';
      const response = await fetch(
        `${apiUrl}/api/reclamacoes/${params.id}/${tipoAcao}`,
        {
          method: metodo,
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (data.success) {
        if (tipoAcao === 'remover') {
          router.push('/reclamacoes');
        } else {
          await carregarReclamacao();
        }
      } else {
        setError(data.message || 'Erro ao executar ação');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
      console.error(err);
    } finally {
      setAcao('');
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
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-500">Carregando reclamação...</p>
        </div>
      </main>
    );
  }

  if (error || !reclamacao) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/reclamacoes" className="text-blue-600 hover:underline">
              ← Voltar para reclamações
            </Link>
          </div>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Reclamação não encontrada'}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/reclamacoes" className="text-blue-600 hover:underline">
            ← Voltar para reclamações
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {reclamacao.titulo}
              </h1>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reclamacao.status)}`}>
                {reclamacao.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Cidade</p>
              <p className="text-lg font-medium text-gray-900">📍 {reclamacao.cidade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Autor</p>
              <p className="text-lg font-medium text-gray-900">👤 {reclamacao.autor.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Data de Criação</p>
              <p className="text-lg font-medium text-gray-900">{formatarData(reclamacao.data_criacao)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Última Atualização</p>
              <p className="text-lg font-medium text-gray-900">{formatarData(reclamacao.data_atualizacao)}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Descrição</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {reclamacao.descricao}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-6 border-t border-gray-200 flex-wrap">
            {reclamacao.status === 'pendente' && (
              <>
                <button
                  onClick={() => handleAcao('resolver')}
                  disabled={acao !== ''}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {acao === 'resolver' ? 'Resolvendo...' : '✓ Marcar como Resolvida'}
                </button>
                <button
                  onClick={() => handleAcao('contestar')}
                  disabled={acao !== ''}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {acao === 'contestar' ? 'Contestando...' : '⚠ Contestar'}
                </button>
              </>
            )}

            {reclamacao.status === 'resolvida' && (
              <button
                onClick={() => handleAcao('contestar')}
                disabled={acao !== ''}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {acao === 'contestar' ? 'Contestando...' : '⚠ Contestar Resolução'}
              </button>
            )}

            <button
              onClick={() => handleAcao('remover')}
              disabled={acao !== ''}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {acao === 'remover' ? 'Removendo...' : '🗑 Remover'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
