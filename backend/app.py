import os
import sys

# Garantir que a raiz do projeto esteja no sys.path antes de importar
# outros módulos do pacote `backend`. Isso permite executar:
#   python3 backend/app.py
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from flask import Flask
from flask_cors import CORS
from os import getenv
from dotenv import load_dotenv
from backend.extensions import init_db, init_env, db, login_manager
from flask import Blueprint

# Inicializa .env e variáveis de ambiente
init_env()
load_dotenv(os.path.join(ROOT_DIR, ".env"))

FRONTEND_URL = getenv("FRONTEND_URL", "http://localhost:3000")

app = Flask(__name__)
app.secret_key = getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE", "sqlite:///database.db")

# Configurar CORS
CORS(app, resources={r"/*": {"origins": FRONTEND_URL}}, supports_credentials=True)

# Inicializar login manager
login_manager.init_app(app)
db.init_app(app)
init_db(app)

# Blueprint raiz para API
api_bp = Blueprint('api', __name__, url_prefix='/api')

# Importar controllers
from backend.controllers.auth_controller import auth_bp
from backend.controllers.reclamacoes_controller import reclamacoes_bp

# Registrar blueprints na API
api_bp.register_blueprint(auth_bp)
api_bp.register_blueprint(reclamacoes_bp)

# Registrar API no app
app.register_blueprint(api_bp)

# Rota de health check
@app.route('/health', methods=['GET'])
def health():
    return {'status': 'ok'}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
