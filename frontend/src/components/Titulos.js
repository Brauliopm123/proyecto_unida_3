import { useEffect, useState } from "react";
import API from "../services/api";

function Titulos(){

  const [titulos, setTitulos] = useState([]);

  const [form, setForm] = useState({
    titulo: "",
    tipo: "anime",
    genero: "",
    estado: "en_emision",
    total_episodios: "",
    sinopsis: ""
  });

  // Manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Obtener catálogo
  const obtenerTitulos = () => {
    API.get("/titulos")
      .then(res => setTitulos(res.data))
      .catch(err => console.log(err));
  };

  // Crear título
  const crearTitulo = () => {
    API.post("/titulos", form)
      .then(() => {
        alert("Título agregado");
        obtenerTitulos(); // refresca lista
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    obtenerTitulos();
  }, []);

  return (
    <div>

      {/* FORMULARIO */}
      <div className="form">
        <h2>🎬 Crear Anime/Manga</h2>

        <input
          name="titulo"
          placeholder="Nombre del título"
          onChange={handleChange}
        />

        <select name="tipo" onChange={handleChange}>
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>

        <input
          name="genero"
          placeholder="Género"
          onChange={handleChange}
        />

        <select name="estado" onChange={handleChange}>
          <option value="en_emision">En emisión</option>
          <option value="finalizado">Finalizado</option>
          <option value="pendiente">Pendiente</option>
        </select>

        <input
          name="total_episodios"
          placeholder="Total episodios"
          onChange={handleChange}
        />

        <input
          name="sinopsis"
          placeholder="Sinopsis"
          onChange={handleChange}
        />

        <button onClick={crearTitulo}>
          Agregar
        </button>
      </div>

      {/* LISTA */}
      <h2 style={{paddingLeft:"20px"}}>📺 Catálogo</h2>

      <div className="grid">

        {titulos.map(t => (
          <div className="card" key={t.id}>

            <h3>{t.titulo}</h3>

            <p><b>Tipo:</b> {t.tipo}</p>
            <p><b>Género:</b> {t.genero}</p>
            <p><b>Estado:</b> {t.estado}</p>
            <p><b>Episodios:</b> {t.total_episodios}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Titulos;