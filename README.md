## Integrantes
- [Givanilson](https://github.com/Joyuv)  
- [Pedro Victor](https://github.com/ZagZx)  
- [Abraão](https://github.com/Abraao3)  
- [João Paulo](https://github.com/Paulinzz)  

## Problema escolhido 
Invisibilidade dos problemas corriqueiros do cidadão, por exemplo: Ruas esburacadas, falta decalçamento, cano estourado, etc.

## Objetivo do sistema
Levar as reclamações do povo a prefeitura. O aplicativo permitirá que o cidadão
abra uma reclamação descrevendo o problema.

## Público alvo
O cidadão.

## Funcionalidades
CRUD de reclamações, pesquisa por filtros das reclamações, gráficos dinâmicos de
taxa de reclamações resolvidas, contestamento de conclusão (Contestar a conclusão de uma
reclamação apresentando provas que não foi concluído), mapa estático da cidade (se possível
interativo com dados de reclamações por localidade).

## Rotas Principais
- /
- /reclamacoes
- /reclamacoes/resolvidas
- /reclamacoes/pendentes
- /reclamacoes/contestadas
- /reclamacao/adicionar
- /reclamacao/<reclamacao_id>
- /reclamacao/<reclamacao_id>/remover
- /reclamacao/<reclamacao_id>/atualizar
- /reclamacao/<reclamacao_id>/resolver
- /reclamacao/<reclamacao_id>/contestar
- /login
- /cadastro
- /logout
- /usuario/<usuario_id>/reclamacoes
- /usuario/<usuario_id>/atualizar/


---------------------------------------------------------------------

Este repositório contém um backend em Flask (Python) e um frontend em
Next.js (React + TypeScript). 



## 1) Modo mais simples (recomendado)

Há dois scripts prontos na raiz para facilitar:

- `start.sh` — cria o ambiente (se necessário), instala dependências e
	inicia backend e frontend em background. Grava logs e PIDs.
- `stop.sh` — para os serviços iniciados pelo `start.sh`.

Uso:

```bash
cd /home/abraao/Documentos/projeto-psi
bash start.sh   # cria venv, instala deps, inicia backend e frontend

# quando quiser parar
bash stop.sh
```

Ao final o script mostrará as URLs:

- Backend: `http://localhost:5000` (ou `http://localhost:5001` se 5000 estiver
	ocupada)
- Frontend: `http://localhost:3000`

Os logs ficam em `backend.log` e `frontend.log`. Os PIDs ficam em
`backend.pid` e `frontend.pid`.

## 2) Modo manual (opcional)

Se preferir rodar manualmente:

1. Criar/ativar venv e instalar dependências Python:

```bash
cd /home/abraao/Documentos/projeto-psi
python3 -m venv env
source env/bin/activate
pip install -r backend/requirements.txt
```

2. Iniciar backend (comando simples):

```bash
python3 app.py
```

Você pode escolher outra porta com `PORT`:

```bash
PORT=5001 python3 app.py
```

3. Iniciar frontend (opcional):

```bash
cd frontend
npm install   # apenas na primeira vez
npm run dev
```

## 3) Testes

Executar os testes do backend:

```bash
source env/bin/activate
PYTHONPATH=$(pwd) python3 -m pytest backend/tests -q
```

## 4) Seed (usuário de teste)

Criar um usuário de teste:

```bash
python3 scripts/seed_admin.py
# Usuário criado: admin@example.com  senha: senha123
```

## 5) Endpoints úteis

- `GET /health` — health check
- `POST /api/cadastro` — criar usuário
- `POST /api/login` — fazer login (usa cookie de sessão)
- `GET /api/reclamacoes` — listar reclamações

## 6) Troubleshooting rápido

- Se faltar pacote Python: `pip install -r backend/requirements.txt`.
- Se faltar dependências do frontend: entre em `frontend/` e rode `npm install`.
- Se a porta 5000 estiver ocupada, o `start.sh` tenta 5001 automaticamente.
- Para ver logs:

```bash
tail -n 200 backend.log
tail -n 200 frontend.log
```

Se algo der erro, cole a saída do terminal e eu conserto.


## Estrutura do projeto

- `backend/` — API Flask, modelos e controllers
- `frontend/` — Next.js (React + TypeScript) app
- `env/` — ambiente virtual Python (não versionado)

## Requisitos

- Python 3.12+
- Node.js 20+ (recomendado usar NVM)
- npm

## Instalação (Backend)

1. Ative o ambiente virtual:

```bash
cd /home/abraao/Documentos/projeto-psi
source env/bin/activate
```

2. Instale dependências Python (se ainda não estiverem):

```bash
pip install -r backend/requirements.txt
```

3. Variáveis de ambiente: o backend cria um `.env` automático se necessário.

4. Rode a aplicação Flask:

```bash
PYTHONPATH=$(pwd) env/bin/python backend/app.py
```

O backend estará disponível em `http://localhost:5000`.

## Instalação (Frontend)



```bash
# instalar nvm (se não tiver)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20
```

Instale dependências do frontend:

```bash
cd /home/abraao/Documentos/projeto-psi/frontend
npm install
```

Inicie o frontend em modo desenvolvimento:

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Endpoints principais da API

- `GET /api/reclamacoes` — lista todas reclamações
- `GET /api/reclamacoes/<id>` — detalhe de uma reclamação
- `GET /api/reclamacoes/status/pendentes` — reclamações pendentes
- `GET /api/reclamacoes/status/resolvidas` — reclamações resolvidas
- `GET /api/reclamacoes/status/contestadas` — reclamações contestadas
- `POST /api/reclamacoes` — criar reclamação (requer login)
- `POST /api/reclamacoes/<id>/resolver` — marcar como resolvida
- `POST /api/reclamacoes/<id>/contestar` — marcar como contestada
- `DELETE /api/reclamacoes/<id>/remover` — remover reclamação

## Observações e troubleshooting

- Se o VS Code mostrar erros "Cannot find module 'react'" ou erros TypeScript,
	execute `npm install` no diretório `frontend`.
- Se houver erro sobre importações `backend` ao rodar o Flask, execute com
	`PYTHONPATH=$(pwd) env/bin/python backend/app.py` para garantir que o pacote
	local `backend` seja encontrado.
- Banco de dados padrão: `sqlite:///database.db` (arquivo criado automaticamente)
- CORS configurado para `FRONTEND_URL` (padrão `http://localhost:3000`)

## Manutenção

- Para reinstalar dependências do backend: `pip install -r backend/requirements.txt`
- Para limpar e reinstalar frontend: `rm -rf node_modules package-lock.json && npm install`

---

Se precisar que eu ajuste algo no README (mais detalhes de rotas, screenshots,
ou adicionar instruções de deploy), diga o que deseja incluir.

---
Última atualização: 29 de novembro de 2025
Última atualização: 29 de novembro de 2025

## Exemplo de arquivo `.env`

Coloque um arquivo `.env` na raiz do projeto (ou exporte variáveis no ambiente).
Exemplo mínimo:

```
SECRET_KEY=uma_senha_secreta_aqui
DATABASE=sqlite:///database.db
FRONTEND_URL=http://localhost:3000
```

Observação: o backend tenta criar um `.env` automático durante a inicialização
se não encontrar um; ainda assim é útil ter esse `.env` em desenvolvimento.

## Projeto PSI — Guia mínimo para rodar (PT-BR simples)

Este repositório contém:

- `backend/` — API em Flask (Python)
- `frontend/` — interface em Next.js (opcional para entrega)

Objetivo: deixar o projeto simples de rodar localmente sem confusão.

IMPORTANTE: este guia assume que você está em Linux e tem o repositório em
`/home/abraao/Documentos/projeto-psi`.

1) Preparar e rodar o projeto (JEITO MAIS SIMPLES)

Se quiser a forma mais simples para seus amigos executarem tudo, use os
scripts no root. Eles criam o ambiente, instalam dependências e iniciam o
backend e o frontend em background.

- Iniciar tudo (backend + frontend):

```bash
cd /home/abraao/Documentos/projeto-psi
bash start.sh
```

- Parar os serviços:

```bash
bash stop.sh
```

Se preferir fazer manualmente, siga a seção abaixo "Como evitar confusão".

2) (Opcional) Rodar o frontend (para ver a interface)

- Entre na pasta do frontend e instale dependências:

```bash
cd frontend
npm install
npm run dev
```

Em seguida abra `http://localhost:3000` no navegador.

3) Comandos rápidos úteis

- Health do servidor:
	```bash
	curl http://localhost:5000/health
	```
- Criar usuário (exemplo):
	```bash
	curl -X POST -H "Content-Type: application/json" -d '{"username":"user","email":"u@u.com","password":"senha"}' http://localhost:5000/api/cadastro
	```
- Login (salva cookie):
	```bash
	curl -c cookies.txt -X POST -H "Content-Type: application/json" -d '{"email":"u@u.com","password":"senha"}' http://localhost:5000/api/login
	```

4) Como evitar confusão (resumo simples)

- Use `python3 backend/app.py` para rodar o backend (não precisa entender scripts).
- Se faltar algum pacote, execute `pip install -r backend/requirements.txt`.
- Se a porta 5000 estiver ocupada, rode o backend em outra porta:
	```bash
	python3 -c "from backend import app; app.run(port=5001)"
	```

5) Arquivos que criei para facilitar (você não precisa usar se não quiser)

- `scripts/start_backend.sh` e `scripts/stop_backend.sh` — iniciam/param o backend
- `scripts/start_frontend.sh` e `scripts/stop_frontend.sh` — iniciam/param frontend
- `scripts/seed_admin.py` — cria um usuário `admin@example.com` / `senha123` para testes

6) Testes automatizados

- Há testes com `pytest` no diretório `backend/tests/`.
- Rodar testes:
	```bash
	source env/bin/activate
	PYTHONPATH=$(pwd) python3 -m pytest -q
	```