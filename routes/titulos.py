from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dependencies import get_db
from models.titulo import Titulo
from schemas.titulo_schema import TituloCreate

router = APIRouter()

@router.post("/")
def crear_titulo(titulo: TituloCreate, db: Session = Depends(get_db)):
    nuevo = Titulo(**titulo.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


@router.get("/")
def obtener_titulos(db: Session = Depends(get_db)):
    return db.query(Titulo).all()


@router.get("/{id}")
def obtener_titulo(id: int, db: Session = Depends(get_db)):
    return db.query(Titulo).filter(Titulo.id == id).first()