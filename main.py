from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import usuarios, titulos, progreso
from models import usuario, titulo, progreso as progreso_model
from routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Seguimiento Anime y Manga")

app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
app.include_router(titulos.router, prefix="/titulos", tags=["titulos"])
app.include_router(progreso.router, prefix="/progreso", tags=["progreso"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)