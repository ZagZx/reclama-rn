from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from backend.models import Reclamacao, User
from backend.extensions import db
from sqlalchemy import and_


reclamacoes_bp = Blueprint('reclamacoes', __name__, url_prefix='/reclamacoes')


@reclamacoes_bp.route('', methods=['GET'])
def get_reclamacoes():
    """Retorna todas as reclamações"""
    try:
        reclamacoes = Reclamacao.query.all()
        return jsonify({
            'success': True,
            'reclamacoes': [r.to_dict() for r in reclamacoes]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('/<int:id>', methods=['GET'])
def get_reclamacao(id):
    """Retorna uma reclamação específica"""
    try:
        reclamacao = db.session.get(Reclamacao, id)
        if not reclamacao:
            return jsonify({
                'success': False,
                'message': 'Reclamação não encontrada'
            }), 404
        
        return jsonify({
            'success': True,
            'reclamacao': reclamacao.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('/status/pendentes', methods=['GET'])
def get_reclamacoes_pendentes():
    """Retorna todas as reclamações pendentes"""
    try:
        reclamacoes = Reclamacao.query.filter_by(status='pendente').all()
        return jsonify({
            'success': True,
            'reclamacoes': [r.to_dict() for r in reclamacoes]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('/status/resolvidas', methods=['GET'])
def get_reclamacoes_resolvidas():
    """Retorna todas as reclamações resolvidas"""
    try:
        reclamacoes = Reclamacao.query.filter_by(status='resolvida').all()
        return jsonify({
            'success': True,
            'reclamacoes': [r.to_dict() for r in reclamacoes]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('/status/contestadas', methods=['GET'])
def get_reclamacoes_contestadas():
    """Retorna todas as reclamações contestadas"""
    try:
        reclamacoes = Reclamacao.query.filter_by(status='contestada').all()
        return jsonify({
            'success': True,
            'reclamacoes': [r.to_dict() for r in reclamacoes]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('', methods=['POST'])
@login_required
def criar_reclamacao():
    """Cria uma nova reclamação"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'JSON inválido ou ausente'}), 400

        if not all(k in data for k in ['titulo', 'descricao', 'cidade']):
            return jsonify({
                'success': False,
                'message': 'Campos obrigatórios: titulo, descricao, cidade'
            }), 400
        
        reclamacao = Reclamacao(
            titulo=data['titulo'],
            descricao=data['descricao'],
            cidade=data['cidade'],
            status='pendente',
            autor_id=current_user.id
        )
        
        db.session.add(reclamacao)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reclamação criada com sucesso',
            'reclamacao': reclamacao.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('/<int:id>/resolver', methods=['POST'])
@login_required
def resolver_reclamacao(id):
    """Marca uma reclamação como resolvida"""
    try:
        reclamacao = db.session.get(Reclamacao, id)
        if not reclamacao:
            return jsonify({
                'success': False,
                'message': 'Reclamação não encontrada'
            }), 404
        
        # apenas o autor pode marcar como resolvida
        if reclamacao.autor_id != current_user.id:
            return jsonify({'success': False, 'message': 'Permissão negada'}), 403

        reclamacao.status = 'resolvida'
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reclamação marcada como resolvida',
            'reclamacao': reclamacao.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('/<int:id>/contestar', methods=['POST'])
@login_required
def contestar_reclamacao(id):
    """Marca uma reclamação como contestada"""
    try:
        reclamacao = db.session.get(Reclamacao, id)
        if not reclamacao:
            return jsonify({
                'success': False,
                'message': 'Reclamação não encontrada'
            }), 404
        
        # apenas o autor pode contestar
        if reclamacao.autor_id != current_user.id:
            return jsonify({'success': False, 'message': 'Permissão negada'}), 403

        reclamacao.status = 'contestada'
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reclamação marcada como contestada',
            'reclamacao': reclamacao.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('/<int:id>/remover', methods=['DELETE'])
@login_required
def remover_reclamacao(id):
    """Remove uma reclamação"""
    try:
        reclamacao = db.session.get(Reclamacao, id)
        if not reclamacao:
            return jsonify({
                'success': False,
                'message': 'Reclamação não encontrada'
            }), 404
        
        # apenas o autor pode remover
        if reclamacao.autor_id != current_user.id:
            return jsonify({'success': False, 'message': 'Permissão negada'}), 403

        db.session.delete(reclamacao)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reclamação removida com sucesso'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@reclamacoes_bp.route('/<int:id>', methods=['PUT'])
@login_required
def editar_reclamacao(id):
    """Edita campos de uma reclamação (titulo, descricao, cidade)"""
    try:
        reclamacao = db.session.get(Reclamacao, id)
        if not reclamacao:
            return jsonify({'success': False, 'message': 'Reclamação não encontrada'}), 404

        # apenas o autor pode editar
        if reclamacao.autor_id != current_user.id:
            return jsonify({'success': False, 'message': 'Permissão negada'}), 403

        data = request.get_json() or {}
        updated = False
        for field in ('titulo', 'descricao', 'cidade'):
            if field in data and isinstance(data[field], str) and data[field].strip():
                setattr(reclamacao, field, data[field].strip())
                updated = True

        if not updated:
            return jsonify({'success': False, 'message': 'Nenhum campo válido fornecido'}), 400

        db.session.commit()
        return jsonify({'success': True, 'message': 'Reclamação atualizada', 'reclamacao': reclamacao.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500