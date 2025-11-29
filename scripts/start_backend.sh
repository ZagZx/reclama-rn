#!/usr/bin/env bash
set -euo pipefail
# Start the Flask backend using the project's virtualenv
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"
echo "Activating venv..."
source env/bin/activate

export PYTHONPATH="$ROOT_DIR"
LOGFILE="$ROOT_DIR/backend.log"
PIDFILE="$ROOT_DIR/backend.pid"

if [ -f "$PIDFILE" ]; then
  PID=$(cat "$PIDFILE") || true
  if [ -n "$PID" ] && ps -p "$PID" >/dev/null 2>&1; then
    echo "Backend already running (PID $PID). Stop it first or remove $PIDFILE."
    exit 0
  else
    rm -f "$PIDFILE"
  fi
fi

echo "Starting backend... logs -> $LOGFILE"
nohup env/bin/python backend/app.py > "$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"
echo "Backend started with PID $(cat $PIDFILE)"
