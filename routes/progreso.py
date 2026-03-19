from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dependencies import get_db
from models.progreso import Progreso
from schemas.progreso_schema import ProgresoCreate

router = APIRouter()

@router.post("/")
def registrar_progreso(data: ProgresoCreate, db: Session = Depends(get_db)):
    progreso = Progreso(**data.dict())
    db.add(progreso)
    db.commit()
    db.refresh(progreso)
    return progreso


@router.get("/usuario/{usuario_id}")
def progreso_usuario(usuario_id: int, db: Session = Depends(get_db)):
    return db.query(Progreso).filter(Progreso.usuario_id == usuario_id).all()


@router.put("/{id}")
def actualizar_progreso(id: int, data: ProgresoCreate, db: Session = Depends(get_db)):
    progreso = db.query(Progreso).filter(Progreso.id == id).first()

    progreso.episodio_actual = data.episodio_actual
    progreso.estado_personal = data.estado_personal

    db.commit()
    return progreso