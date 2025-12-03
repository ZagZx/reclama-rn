from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from os import getenv
from backend.models import StatusReclamacao, Reclamacao, FotoReclamacao
from backend.extensions import db
from backend.utils import (
    criar_e_obter_diretorio_contestacao, 
    criar_e_obter_diretorio_reclamacao,
    salvar_imagem,
    RECLAMACOES_PATH, 
    CONTESTACOES_PATH
)


reclamacoes_bp = Blueprint('reclamacoes', __name__)


# RECLAMAÇÃO INDIVIDUAL

@reclamacoes_bp.route('/reclamacao/<int:reclamacao_id>')
def get_reclamacao(reclamacao_id):
    reclamacao: Reclamacao = Reclamacao.query.get_or_404(reclamacao_id)

    return jsonify({"reclamacao": reclamacao.to_dict()}), 200

@reclamacoes_bp.route('/reclamacao/adicionar', methods=["POST"])
@login_required
def add_reclamacao():
    dados = request.json
    arquivos = request.files
    # obrigatorios
    titulo = dados.get("titulo")
    descricao = dados.get("descricao")
    cidade = dados.get("cidade")
    # opcionais
    endereco = dados.get("endereco")
    # latitude = dados.get("latitude")
    # longitude = dados.get("longitude")

    if not titulo or not descricao or not cidade:
        return jsonify({"message": "Preencha todos os campos obrigatórios: título, cidade, descrição,"}), 400
    
    usuario_id = current_user.get_id()

    reclamacao = Reclamacao(
        titulo=titulo, 
        descricao=descricao, 
        cidade=cidade, 
        usuario_id=usuario_id, 
        endereco=endereco, 
        # latitude=latitude, 
        # longitude=longitude
    )


    imagens = arquivos.getlist("fotos")
    path = criar_e_obter_diretorio_reclamacao(reclamacao)

    fotos_reclamacao = []
    for img in imagens:
        filename = salvar_imagem(path, img)
        url = f"/api/uploads/reclamacoes/{reclamacao.id}/{filename}"
        foto_reclamacao = FotoReclamacao(url=url, nome_arquivo=filename)

    try:
        db.session.add(reclamacao)
        db.session.commit()
        return jsonify({"message": "Reclamação adicionada com sucesso", "reclamacao": reclamacao.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Erro ao adicionar reclamação: {e}"}), 500
    

# LISTAGEM DE RECLAMAÇÕES

@reclamacoes_bp.route('/reclamacoes')
def reclamacoes():
    reclamacoes: list[Reclamacao] = Reclamacao.query.all()
    reclamacoes_to_dict = [reclamacao.to_dict() for reclamacao in reclamacoes]

    return jsonify({"reclamacoes": reclamacoes_to_dict}), 200

@reclamacoes_bp.route('/reclamacoes/pendentes')
def reclamacoes_pendentes():
    reclamacoes: list[Reclamacao] = Reclamacao.query.filter(Reclamacao.status == StatusReclamacao.PENDENTE).all()
    reclamacoes_to_dict = [reclamacao.to_dict() for reclamacao in reclamacoes]

    return jsonify({"reclamacoes": reclamacoes_to_dict}), 200

@reclamacoes_bp.route('/reclamacoes/resolvidas')
def reclamacoes_resolvidas():
    reclamacoes: list[Reclamacao] = Reclamacao.query.filter(Reclamacao.status == StatusReclamacao.RESOLVIDA).all()
    reclamacoes_to_dict = [reclamacao.to_dict() for reclamacao in reclamacoes]

    return jsonify({"reclamacoes": reclamacoes_to_dict}), 200

@reclamacoes_bp.route('/reclamacoes/contestadas')
def reclamacoes_contestadas():
    reclamacoes: list[Reclamacao] = Reclamacao.query.filter(Reclamacao.status == StatusReclamacao.CONTESTADA).all()
    reclamacoes_to_dict = [reclamacao.to_dict() for reclamacao in reclamacoes]

    return jsonify({"reclamacoes": reclamacoes_to_dict}), 200