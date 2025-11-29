#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR/frontend"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
if command -v nvm >/dev/null 2>&1; then
  nvm use 20 >/dev/null 2>&1 || true
fi

LOGFILE="$ROOT_DIR/frontend.log"
PIDFILE="$ROOT_DIR/frontend.pid"

if [ -f "$PIDFILE" ]; then
  PID=$(cat "$PIDFILE") || true
  if [ -n "$PID" ] && ps -p "$PID" >/dev/null 2>&1; then
    echo "Frontend already running (PID $PID). Stop it first or remove $PIDFILE."
    exit 0
  else
    rm -f "$PIDFILE"
  fi
fi

echo "Starting frontend dev server... logs -> $LOGFILE"
nohup npm run dev > "$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"
echo "Frontend started with PID $(cat $PIDFILE)"
