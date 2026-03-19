from pydantic import BaseModel

class UsuarioCreate(BaseModel):
    nombre: str
    correo: str
    contraseña: str