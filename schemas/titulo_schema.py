from pydantic import BaseModel

class TituloCreate(BaseModel):
    titulo: str
    tipo: str
    genero: str
    estado: str
    total_episodios: int
    sinopsis: str