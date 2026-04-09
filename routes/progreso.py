from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db, get_usuario_actual
from models.progreso import Progreso
from models.titulo import Titulo
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
def obtener_progreso(usuario_id: int, db: Session = Depends(get_db)):
    resultados = db.query(Progreso, Titulo).join(
        Titulo, Progreso.titulo_id == Titulo.id
    ).filter(
        Progreso.usuario_id == usuario_id
    ).all()

    return [
        {
            "id": p.id,
            "titulo_id": p.titulo_id,
            "titulo": t.titulo,  # 🔥 AQUÍ VA EL NOMBRE
            "episodio_actual": p.episodio_actual,
            "estado_personal": p.estado_personal
        }
        for p, t in resultados
    ]


@router.put("/{id}")
def actualizar_progreso(id: int, data: ProgresoCreate, db: Session = Depends(get_db)):
    progreso = db.query(Progreso).filter(Progreso.id == id).first()

    progreso.episodio_actual = data.episodio_actual
    progreso.estado_personal = data.estado_personal

    db.commit()
    return progreso

@router.delete("/{id}")
def eliminar_progreso(
    id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_usuario_actual)
):
    progreso = db.query(Progreso).filter(Progreso.id == id).first()

    if not progreso:
        raise HTTPException(status_code=404, detail="No encontrado")

    db.delete(progreso)
    db.commit()

    return {"mensaje": "Eliminado correctamente"}