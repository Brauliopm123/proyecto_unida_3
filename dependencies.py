from fastapi import Header, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.usuario import Usuario
from database import SessionLocal

def get_usuario_actual(
    usuario_id: int = Header(None),
    db: Session = Depends(get_db)
):
    if not usuario_id:
        raise HTTPException(status_code=401, detail="No autenticado")

    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return usuario

def solo_admin(usuario = Depends(get_usuario_actual)):
    if usuario.rol != "admin":
        raise HTTPException(status_code=403, detail="No autorizado")
    return usuario

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()