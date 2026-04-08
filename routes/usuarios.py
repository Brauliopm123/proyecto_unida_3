from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from dependencies import get_db
from models.usuario import Usuario
from schemas.usuario_schema import UsuarioCreate
from dependencies import solo_admin

router = APIRouter()

@router.post("/")
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    nuevo_usuario = Usuario(**usuario.dict())
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario


@router.get("/")
def obtener_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario).all()


@router.delete("/{id}")
def eliminar_usuario(
    id: int,
    db: Session = Depends(get_db),
    usuario_actual = Depends(solo_admin)
):
    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(usuario)
    db.commit()

    return {"mensaje": "Usuario eliminado"}

@router.get("/{id}")
def obtener_usuario(id: int, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return usuario

@router.put("/{id}")
def actualizar_usuario(id: int, data: UsuarioCreate, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    usuario.nombre = data.nombre
    usuario.correo = data.correo
    usuario.contraseña = data.contraseña

    db.commit()

    return {"mensaje": "Usuario actualizado"}