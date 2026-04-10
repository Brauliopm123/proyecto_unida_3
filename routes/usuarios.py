from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from dependencies import get_db
from models.usuario import Usuario
from schemas.usuario_schema import UsuarioCreate, UsuarioUpdate
from dependencies import solo_admin

router = APIRouter()

@router.post("/")
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    nuevo_usuario = Usuario(**usuario.dict())
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

@router.post("/registro")
def registrar_usuario(data: UsuarioCreate, db: Session = Depends(get_db)):

    # Verificar si ya existe
    existente = db.query(Usuario).filter(Usuario.correo == data.correo).first()

    if existente:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    nuevo = Usuario(
        nombre=data.nombre,
        correo=data.correo,
        contraseña=data.contraseña,
        rol="usuario"  # SIEMPRE usuario
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return {
        "mensaje": "Usuario registrado correctamente"
    }


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
def actualizar_usuario(id: int, data: UsuarioUpdate, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    usuario.nombre = data.nombre
    usuario.correo = data.correo
    usuario.rol = data.rol
    if data.contraseña:
        usuario.contraseña = data.contraseña

    db.commit()

    return {"mensaje": "Usuario actualizado"}