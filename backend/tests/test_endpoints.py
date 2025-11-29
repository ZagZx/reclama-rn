import json
import pytest
from flask import Blueprint

from backend.extensions import db, login_manager
from backend.controllers.reclamacoes_controller import reclamacoes_bp
from backend.controllers.auth_controller import auth_bp


def create_test_app():
    from flask import Flask

    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SECRET_KEY'] = 'test-secret'

    db.init_app(app)
    login_manager.init_app(app)

    api_bp = Blueprint('api', __name__, url_prefix='/api')
    api_bp.register_blueprint(auth_bp)
    api_bp.register_blueprint(reclamacoes_bp)
    app.register_blueprint(api_bp)

    with app.app_context():
        db.create_all()

    return app


@pytest.fixture
def client():
    app = create_test_app()
    with app.test_client() as client:
        yield client


def test_signup_login_create_list_edit_delete_flow(client):
    # Signup
    resp = client.post('/api/cadastro', json={
        'username': 'tester',
        'email': 'tester@example.com',
        'password': 'senha123'
    })
    assert resp.status_code == 201

    # Login
    resp = client.post('/api/login', json={
        'email': 'tester@example.com',
        'password': 'senha123'
    })
    assert resp.status_code == 200

    # Create reclamacao (should be allowed since logged in)
    resp = client.post('/api/reclamacoes', json={
        'titulo': 'Teste',
        'descricao': 'Descricao teste',
        'cidade': 'CidadeX'
    })
    assert resp.status_code == 201
    data = resp.get_json()
    assert data['success'] is True
    rid = data['reclamacao']['id']

    # Listagem
    resp = client.get('/api/reclamacoes')
    assert resp.status_code == 200
    data = resp.get_json()
    assert any(r['id'] == rid for r in data['reclamacoes'])

    # Edit reclamacao
    resp = client.put(f'/api/reclamacoes/{rid}', json={'titulo': 'Teste Editado'})
    assert resp.status_code == 200
    data = resp.get_json()
    assert data['reclamacao']['titulo'] == 'Teste Editado'

    # Resolver
    resp = client.post(f'/api/reclamacoes/{rid}/resolver')
    assert resp.status_code == 200
    data = resp.get_json()
    assert data['reclamacao']['status'] == 'resolvida'

    # Contestar
    resp = client.post(f'/api/reclamacoes/{rid}/contestar')
    assert resp.status_code == 200
    data = resp.get_json()
    assert data['reclamacao']['status'] == 'contestada'

    # Remover
    resp = client.delete(f'/api/reclamacoes/{rid}/remover')
    assert resp.status_code == 200


def test_create_requires_auth(client):
    # Logout to clear session
    client.post('/api/logout')

    resp = client.post('/api/reclamacoes', json={
        'titulo': 'Sem auth',
        'descricao': 'x',
        'cidade': 'y'
    })
    # Should be 401 or 302 depending on login manager config; assert unauthorized
    assert resp.status_code in (401, 302, 403)
