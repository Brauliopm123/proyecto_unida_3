from sqlalchemy import Column, Integer, String, Text
from database import Base

class Titulo(Base):

    __tablename__ = "titulos"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(200))
    tipo = Column(String(20))
    genero = Column(String(100))
    estado = Column(String(20))
    total_episodios = Column(Integer)
    sinopsis = Column(Text)