from pydantic import BaseModel

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

class Config:
    from_attributes = True