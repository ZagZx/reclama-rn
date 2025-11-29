from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from backend.extensions import db


class Reclamacao(db.Model):
    __tablename__ = 'reclamacoes'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    titulo: Mapped[str] = mapped_column(String(255), nullable=False)
    descricao: Mapped[str] = mapped_column(Text, nullable=False)
    cidade: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default='pendente')
    data_criacao: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    data_atualizacao: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relacionamento com User
    autor_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    autor: Mapped['User'] = relationship('User', backref='reclamacoes')
    
    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'cidade': self.cidade,
            'status': self.status,
            'data_criacao': self.data_criacao.isoformat(),
            'data_atualizacao': self.data_atualizacao.isoformat(),
            'autor_id': self.autor_id,
            'autor': {
                'id': self.autor.id,
                'username': self.autor.username,
                'email': self.autor.email
            } if self.autor else None
        }
    