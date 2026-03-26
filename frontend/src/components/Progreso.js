import { useEffect, useState } from "react";
import API from "../services/api";

function Progreso(){

  // ESTADOS
  const [lista, setLista] = useState([]);
  const [titulos, setTitulos] = useState([]);

  const [form, setForm] = useState({
    id: "",
    usuario_id: "",
    titulo_id: "",
    episodio_actual: "",
    estado_personal: "viendo"
  });

  const [editando, setEditando] = useState(false);

  // MANEJO DE INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // OBTENER TITULOS (para mostrar nombres)
  useEffect(() => {
    API.get("/titulos")
      .then(res => setTitulos(res.data))
      .catch(err => console.log(err));
  }, []);

  // OBTENER PROGRESO POR USUARIO
  const obtenerProgreso = () => {
    if(!form.usuario_id) return;

    API.get(`/progreso/usuario/${form.usuario_id}`)
      .then(res => setLista(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    obtenerProgreso();
  }, [form.usuario_id]);

  // FUNCION PARA MOSTRAR NOMBRE DEL ANIME
  const obtenerNombreTitulo = (id) => {
    const titulo = titulos.find(t => t.id === id);
    return titulo ? titulo.titulo : "Desconocido";
  };

  // CREAR PROGRESO
  const crearProgreso = () => {
    API.post("/progreso", form)
      .then(() => {
        alert("Progreso registrado");
        obtenerProgreso();
        limpiarForm();
      })
      .catch(err => console.log(err));
  };

  // SELECCIONAR PARA EDITAR
  const seleccionarProgreso = (p) => {
    setForm(p);
    setEditando(true);
  };

  // ACTUALIZAR PROGRESO
  const actualizarProgreso = () => {
    API.put(`/progreso/${form.id}`, form)
      .then(() => {
        alert("Progreso actualizado");
        obtenerProgreso();
        limpiarForm();
      })
      .catch(err => console.log(err));
  };

  // ELIMINAR PROGRESO
  const eliminarProgreso = (id) => {
    if(!window.confirm("¿Eliminar progreso?")) return;

    API.delete(`/progreso/${id}`)
      .then(() => {
        alert("Progreso eliminado");
        obtenerProgreso();
      })
      .catch(err => console.log(err));
  };

  // LIMPIAR FORMULARIO
  const limpiarForm = () => {
    setForm({
      id: "",
      usuario_id: "",
      titulo_id: "",
      episodio_actual: "",
      estado_personal: "viendo"
    });
    setEditando(false);
  };

  return (
    <div>

      {/* FORMULARIO */}
      <div className="form">

        <h2>Progreso</h2>

        <input
          name="usuario_id"
          placeholder="ID Usuario"
          value={form.usuario_id}
          onChange={handleChange}
        />

        {/* SELECT DINAMICO DE TITULOS */}
        <select
          name="titulo_id"
          value={form.titulo_id}
          onChange={handleChange}
        >
          <option value="">Selecciona un título</option>
          {titulos.map(t => (
            <option key={t.id} value={t.id}>
              {t.titulo}
            </option>
          ))}
        </select>

        <input
          name="episodio_actual"
          placeholder="Episodio actual"
          value={form.episodio_actual}
          onChange={handleChange}
        />

        <select
          name="estado_personal"
          value={form.estado_personal}
          onChange={handleChange}
        >
          <option value="viendo">Viendo</option>
          <option value="completado">Completado</option>
          <option value="pausa">Pausa</option>
          <option value="abandonado">Abandonado</option>
        </select>

        {editando ? (
          <>
            <button onClick={actualizarProgreso}>
              Actualizar
            </button>

            <button onClick={limpiarForm}>
              Cancelar
            </button>
          </>
        ) : (
          <button onClick={crearProgreso}>
            Guardar Progreso
          </button>
        )}

      </div>

      {/* LISTA */}
      <h3 style={{paddingLeft:"20px"}}>Historial</h3>

      <div className="grid">

        {lista.length === 0 ? (
          <p>No hay progreso registrado</p>
        ) : (
          lista.map(p => (
            <div className="card" key={p.id}>

              <p><b>Usuario:</b> {p.usuario_id}</p>
              <p><b>Título:</b> {obtenerNombreTitulo(p.titulo_id)}</p>
              <p><b>Episodio:</b> {p.episodio_actual}</p>
              <p><b>Estado:</b> {p.estado_personal}</p>

              <button onClick={() => seleccionarProgreso(p)}>
                Editar
              </button>

              <button onClick={() => eliminarProgreso(p.id)}>
                Eliminar
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Progreso;