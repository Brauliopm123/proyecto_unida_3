from pydantic import BaseModel

class ProgresoCreate(BaseModel):
    usuario_id: int
    titulo_id: int
    episodio_actual: int
    estado_personal: str