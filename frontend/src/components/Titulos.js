import { useEffect, useState } from "react";
import API from "../services/api";

function Titulos(){

  const [titulos, setTitulos] = useState([]);

  const [form, setForm] = useState({
    id: "",
    titulo: "",
    tipo: "anime",
    genero: "",
    estado: "en_emision",
    total_episodios: "",
    sinopsis: ""
  });

  const [editando, setEditando] = useState(false);

  // Obtener catálogo
  const obtenerTitulos = () => {
    API.get("/titulos")
      .then(res => setTitulos(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    obtenerTitulos();
  }, []);

  // Manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Crear título
  const crearTitulo = () => {
    API.post("/titulos", form)
      .then(() => {
        alert("Título creado");
        obtenerTitulos();
        limpiarForm();
      })
      .catch(err => console.log(err));
  };

  // Seleccionar para editar
  const seleccionarTitulo = (t) => {
    setForm(t);
    setEditando(true);
  };

  // Actualizar título
  const actualizarTitulo = () => {
    API.put(`/titulos/${form.id}`, form)
      .then(() => {
        alert("Título actualizado");
        obtenerTitulos();
        limpiarForm();
      })
      .catch(err => console.log(err));
  };

  // Eliminar título
  const eliminarTitulo = (id) => {
    if(!window.confirm("¿Eliminar título?")) return;

    API.delete(`/titulos/${id}`)
      .then(() => {
        alert("Título eliminado");
        obtenerTitulos();
      })
      .catch(err => console.log(err));
  };

  // Limpiar formulario
  const limpiarForm = () => {
    setForm({
      id: "",
      titulo: "",
      tipo: "anime",
      genero: "",
      estado: "en_emision",
      total_episodios: "",
      sinopsis: ""
    });
    setEditando(false);
  };

  return (
    <div>

      {/* FORMULARIO */}
      <div className="form">

        <h2>🎬 Catálogo</h2>

        <input
          name="titulo"
          placeholder="Nombre del título"
          value={form.titulo}
          onChange={handleChange}
        />

        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>

        <input
          name="genero"
          placeholder="Género"
          value={form.genero}
          onChange={handleChange}
        />

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="en_emision">En emisión</option>
          <option value="finalizado">Finalizado</option>
          <option value="pendiente">Pendiente</option>
        </select>

        <input
          name="total_episodios"
          placeholder="Total episodios"
          value={form.total_episodios}
          onChange={handleChange}
        />

        <input
          name="sinopsis"
          placeholder="Sinopsis"
          value={form.sinopsis}
          onChange={handleChange}
        />

        {editando ? (
          <>
            <button onClick={actualizarTitulo}>
              Actualizar
            </button>

            <button onClick={limpiarForm}>
              Cancelar
            </button>
          </>
        ) : (
          <button onClick={crearTitulo}>
            Agregar
          </button>
        )}

      </div>

      {/* LISTA */}
      <h3 style={{paddingLeft:"20px"}}>📺 Catálogo</h3>

      <div className="grid">

        {titulos.map(t => (
          <div className="card" key={t.id}>

            <h3>{t.titulo}</h3>

            <p><b>Tipo:</b> {t.tipo}</p>
            <p><b>Género:</b> {t.genero}</p>
            <p><b>Estado:</b> {t.estado}</p>
            <p><b>Episodios:</b> {t.total_episodios}</p>

            <button onClick={() => seleccionarTitulo(t)}>
              Editar
            </button>

            <button onClick={() => eliminarTitulo(t.id)}>
              Eliminar
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Titulos;