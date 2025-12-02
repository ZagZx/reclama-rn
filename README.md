## Integrantes
- [Givanilson](https://github.com/Joyuv)  
- [Pedro Victor](https://github.com/ZagZx)  
- [Abraão](https://github.com/Abraao3)  
- [João Paulo](https://github.com/Paulinzz)  

<!-- ## Problema escolhido 
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
interativo com dados de reclamações por localidade). -->

## Requisitos

- Python 3.12+
- Node.js 20+
- npm

## Estrutura do projeto

- `backend/` — API Flask, modelos e controllers
- `frontend/` — Next.js (React + TypeScript) app

## Rotas Principais

- `/`
- `/reclamacoes`
- `/reclamacoes/resolvidas`
- `/reclamacoes/pendentes`
- `/reclamacoes/contestadas`
- `/reclamacao/adicionar`
- `/reclamacao/<reclamacao_id>`
- `/reclamacao/<reclamacao_id>/remover`
- `/reclamacao/<reclamacao_id>/atualizar`
- `/reclamacao/<reclamacao_id>/resolver`
- `/reclamacao/<reclamacao_id>/contestar`
- `/login`
- `/cadastro`
- `/logout`
- `/usuario/<usuario_id>/reclamacoes`
- `/usuario/<usuario_id>/atualizar/`

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

## Execução

### Backend

<details>
<summary>Linux</summary>

1. Dirigir-se ao diretório do backend:
	```bash
	cd backend
	```
2. Criando o ambiente virtual (se ainda não foi):

	```bash
	python3 -m venv env
	```
	
3. Ative o ambiente virtual:

	```bash
	source env/bin/activate
	```

4. Instalar dependências Python (se ainda não estiverem):

	```bash
	pip install -r requirements.txt
	```

5. Iniciar backend (porta padrão 5000): 

	```bash
	flask run
	```

	OBS: É necessário que o ambiente virtual esteja ativado e as dependências já instaladas.
</details>

<details>
<summary>Windows</summary>

1. Dirigir-se ao diretório do backend:
	```bash
	cd backend
	```
2. Criando o ambiente virtual (se ainda não foi):

	```bash
	python -m venv env
	```
	
3. Ative o ambiente virtual:

	```bash
	.\env\Scripts\activate
	```

4. Instalar dependências Python (se ainda não estiverem):

	```bash
	pip install -r requirements.txt
	```

5. Iniciar backend (porta padrão 5000): 

	```bash
	flask run
	```

	OBS: É necessário que o ambiente virtual esteja ativado e as dependências já instaladas.
</details>

### Frontend

1. Iniciar frontend (porta padrão 3000):

	```bash
	cd frontend
	npm install   # apenas na primeira vez
	npm run dev
	```


## Exemplo de arquivo `.env`

Para qualquer mudança que fizer na url do banco, porta ou ip, altere no `.env`.

O backend cria um `.env` padrão durante a inicialização com as seguintes variáveis:

```
DATABASE = "sqlite:///database.db"
SECRET_KEY = (chave gerada aleatoriamente)
BACKEND_URL = "http://localhost:5000"
FRONTEND_URL = "http://localhost:3000"
```