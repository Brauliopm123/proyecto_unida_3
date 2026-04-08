from sqlalchemy import Column, Integer, String, DateTime, Enum
from database import Base
import datetime

class Usuario(Base):

    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    correo = Column(String(150), unique=True)
    contraseña = Column(String(255))
    rol = Column(Enum("admin", "usuario"), default="usuario")
    fecha_registro = Column(DateTime, default=datetime.datetime.utcnow)