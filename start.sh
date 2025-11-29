#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Iniciando setup mínimo do Projeto PSI..."

# 1) Criar virtualenv e instalar dependências Python se necessário
if [ ! -d "$ROOT_DIR/env" ]; then
  echo "Criando ambiente virtual em $ROOT_DIR/env e instalando dependências Python..."
  python3 -m venv "$ROOT_DIR/env"
  "$ROOT_DIR/env/bin/pip" install --upgrade pip
  "$ROOT_DIR/env/bin/pip" install -r "$ROOT_DIR/backend/requirements.txt"
else
  echo "Ambiente virtual já existe — pulando criação."
fi

# 2) Instalar dependências do frontend se necessário
if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
  echo "Instalando dependências do frontend (npm install)..."
  (cd "$ROOT_DIR/frontend" && npm install)
else
  echo "Dependências do frontend já instaladas — pulando npm install."
fi

# 3) Iniciar backend (usa o python do venv para não exigir activate)
BACKEND_PORT=5000
if curl -m2 -sS http://localhost:${BACKEND_PORT}/health >/dev/null 2>&1; then
  echo "Backend já está rodando em http://localhost:${BACKEND_PORT}"
else
  echo "Tentando iniciar backend em background na porta ${BACKEND_PORT}..."
  nohup env PORT=${BACKEND_PORT} "$ROOT_DIR/env/bin/python" "$ROOT_DIR/app.py" > "$ROOT_DIR/backend.log" 2>&1 &
  echo $! > "$ROOT_DIR/backend.pid"
  # aguarda health por alguns segundos
  for i in 1 2 3 4 5; do
    sleep 1
    if curl -m1 -sS http://localhost:${BACKEND_PORT}/health >/dev/null 2>&1; then
      echo "Backend iniciado com sucesso em http://localhost:${BACKEND_PORT} (PID: $(cat "$ROOT_DIR/backend.pid"))"
      break
    fi
    # se última tentativa e ainda não subiu, tentaremos porta alternativa
    if [ "$i" -eq 5 ]; then
      echo "Não foi possível iniciar na porta ${BACKEND_PORT}. Tentando porta 5001..."
      # matar processo atual se existir
      PIDTRY=$(cat "$ROOT_DIR/backend.pid" 2>/dev/null || echo "")
      if [ -n "$PIDTRY" ]; then kill "$PIDTRY" >/dev/null 2>&1 || true; fi
      nohup env PORT=5001 "$ROOT_DIR/env/bin/python" "$ROOT_DIR/app.py" > "$ROOT_DIR/backend.log" 2>&1 &
      echo $! > "$ROOT_DIR/backend.pid"
      sleep 1
      if curl -m2 -sS http://localhost:5001/health >/dev/null 2>&1; then
        echo "Backend iniciado em http://localhost:5001 (PID: $(cat "$ROOT_DIR/backend.pid"))"
      else
        echo "Falha ao iniciar backend nas portas 5000 e 5001. Veja $ROOT_DIR/backend.log"
      fi
    fi
  done
  echo "(Últimas linhas do log)"
  tail -n 40 "$ROOT_DIR/backend.log" || true
fi

# 4) Iniciar frontend em background
cd "$ROOT_DIR/frontend"
if curl -m2 -sS http://localhost:3000/ >/dev/null 2>&1; then
  echo "Frontend já está rodando em http://localhost:3000"
else
  echo "Iniciando frontend em background (porta 3000)..."
  nohup npm run dev > "$ROOT_DIR/frontend.log" 2>&1 &
  echo $! > "$ROOT_DIR/frontend.pid"
  sleep 2
  echo "Frontend PID: $(cat "$ROOT_DIR/frontend.pid")" || true
  echo "(Últimas linhas do log)"
  tail -n 40 "$ROOT_DIR/frontend.log" || true
fi

USED_BACKEND_PORT=5000
if curl -m1 -sS http://localhost:5000/health >/dev/null 2>&1; then
  USED_BACKEND_PORT=5000
elif curl -m1 -sS http://localhost:5001/health >/dev/null 2>&1; then
  USED_BACKEND_PORT=5001
else
  USED_BACKEND_PORT="(não disponível)"
fi

echo "\nPronto. URLs:"
echo "- Backend: http://localhost:${USED_BACKEND_PORT}"
echo "- Frontend: http://localhost:3000"
echo "Use './stop.sh' para parar ambos os serviços." 
