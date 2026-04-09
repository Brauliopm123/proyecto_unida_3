from pydantic import BaseModel
from typing import Optional

class UsuarioCreate(BaseModel):
    nombre: str
    correo: str
    contraseña: str

class UsuarioBase(UsuarioCreate):
    rol: str = "usuario"

class UsuarioOut(BaseModel):
    id: int
    nombre: str
    correo: str
    rol: str

class UsuarioUpdate(BaseModel):
    nombre: str
    correo: str
    contraseña: Optional[str] = None  # 🔥 CLAVE
    rol: str

class Config:
    from_attributes = True