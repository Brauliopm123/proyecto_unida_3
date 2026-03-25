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

@router.delete("/{id}")
def eliminar_progreso(id: int):
    return {"mensaje": f"Progreso {id} eliminado"}

@router.get("/")
def listar_progreso(usuario_id: int | None = None):
    if usuario_id:
        return {"mensaje": f"Progreso del usuario {usuario_id}"}
    return {"mensaje": "Lista de progreso"}