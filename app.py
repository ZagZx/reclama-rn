#!/usr/bin/env python3
"""
Wrapper simples para iniciar o backend com:

  python3 app.py

Aceita as variáveis de ambiente:
- PORT (padrão 5000)
- DEBUG (1/0 ou true/false, padrão 1)

Exemplos:

  python3 app.py
  PORT=5001 python3 app.py
  DEBUG=0 python3 app.py

"""
import os
from backend import app as _module


def main():
    port = int(os.getenv("PORT", "5000"))
    debug_env = os.getenv("DEBUG", "1").lower()
    debug = debug_env in ("1", "true", "yes")
    _module.app.run(host="0.0.0.0", port=port, debug=debug)


if __name__ == "__main__":
    main()
