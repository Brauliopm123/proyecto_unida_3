from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from dependencies import get_db
from models.titulo import Titulo
from schemas.titulo_schema import TituloCreate
from dependencies import solo_admin

router = APIRouter()

@router.post("/")
def crear_titulo(
    data: TituloCreate,
    db: Session = Depends(get_db),
    usuario = Depends(solo_admin)
):
    nuevo = Titulo(**data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.get("/")
def obtener_titulos(
    genero: str = Query(None),
    estado: str = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Titulo)

    if genero:
        query = query.filter(Titulo.genero == genero)

    if estado:
        query = query.filter(Titulo.estado == estado)

    return query.all()


@router.get("/{id}")
def obtener_titulo(id: int, db: Session = Depends(get_db)):
    return db.query(Titulo).filter(Titulo.id == id).first()

@router.put("/{id}")
def actualizar_titulo(id: int, data: TituloCreate, db: Session = Depends(get_db)):

    titulo = db.query(Titulo).filter(Titulo.id == id).first()

    if not titulo:
        return {"error": "Título no encontrado"}

    titulo.titulo = data.titulo
    titulo.tipo = data.tipo
    titulo.genero = data.genero
    titulo.estado = data.estado
    titulo.total_episodios = data.total_episodios
    titulo.sinopsis = data.sinopsis

    db.commit()

    return {"mensaje": "Título actualizado"}

@router.delete("/{id}")
def eliminar_titulo(id: int, db: Session = Depends(get_db)):

    titulo = db.query(Titulo).filter(Titulo.id == id).first()

    if not titulo:
        return {"error": "Título no encontrado"}

    db.delete(titulo)
    db.commit()

    return {"mensaje": "Título eliminado"}