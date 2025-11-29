#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PIDFILE="$ROOT_DIR/frontend.pid"
LOGFILE="$ROOT_DIR/frontend.log"

if [ ! -f "$PIDFILE" ]; then
  echo "No frontend PID file found ($PIDFILE). Is frontend running?"
  exit 0
fi

PID=$(cat "$PIDFILE")
echo "Stopping frontend PID $PID"
kill "$PID" || true
sleep 1
if ps -p "$PID" >/dev/null 2>&1; then
  echo "Process still running, force killing"
  kill -9 "$PID" || true
fi
rm -f "$PIDFILE"
echo "Stopped. Logs at $LOGFILE"
