from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.usuario import Usuario
from schemas.auth_schema import Login

router = APIRouter()

@router.post("/login")
def login(data: Login, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(
        Usuario.correo == data.correo,
        Usuario.contraseña == data.contraseña
    ).first()

    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {
        "id": usuario.id,
        "nombre": usuario.nombre,
        "correo": usuario.correo,
        "rol": usuario.rol
    }