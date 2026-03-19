from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base
import datetime

class Progreso(Base):

    __tablename__ = "progreso"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    titulo_id = Column(Integer, ForeignKey("titulos.id"))
    episodio_actual = Column(Integer)
    estado_personal = Column(String(20))
    ultima_actualizacion = Column(DateTime, default=datetime.datetime.utcnow)