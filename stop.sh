#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Parando backend e frontend (se estiverem rodando)..."

if [ -f "$ROOT_DIR/backend.pid" ]; then
  PID=$(cat "$ROOT_DIR/backend.pid")
  echo "Parando backend PID $PID"
  kill "$PID" >/dev/null 2>&1 || true
  sleep 1
  if ps -p "$PID" >/dev/null 2>&1; then
    echo "Backend ainda rodando, forçando kill..."
    kill -9 "$PID" >/dev/null 2>&1 || true
  fi
  rm -f "$ROOT_DIR/backend.pid"
  echo "Backend parado. Logs em $ROOT_DIR/backend.log"
else
  echo "Arquivo de PID do backend não encontrado — talvez não esteja rodando."
fi

if [ -f "$ROOT_DIR/frontend.pid" ]; then
  PID=$(cat "$ROOT_DIR/frontend.pid")
  echo "Parando frontend PID $PID"
  kill "$PID" >/dev/null 2>&1 || true
  sleep 1
  if ps -p "$PID" >/dev/null 2>&1; then
    echo "Frontend ainda rodando, forçando kill..."
    kill -9 "$PID" >/dev/null 2>&1 || true
  fi
  rm -f "$ROOT_DIR/frontend.pid"
  echo "Frontend parado. Logs em $ROOT_DIR/frontend.log"
else
  echo "Arquivo de PID do frontend não encontrado — talvez não esteja rodando."
fi

echo "Pronto."
